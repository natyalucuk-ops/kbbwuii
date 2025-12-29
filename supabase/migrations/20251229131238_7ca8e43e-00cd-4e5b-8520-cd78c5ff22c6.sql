-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'teacher');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create gallery_items table
CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'umum',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  location TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create ppdb_leads table (registration interest form)
CREATE TABLE public.ppdb_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ppdb_leads ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is staff (admin or teacher)
CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'teacher')
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Staff can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_staff(auth.uid()));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for announcements
CREATE POLICY "Public can view published announcements"
  ON public.announcements FOR SELECT
  USING (is_published = true);

CREATE POLICY "Staff can view all announcements"
  ON public.announcements FOR SELECT
  USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can create announcements"
  ON public.announcements FOR INSERT
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update announcements"
  ON public.announcements FOR UPDATE
  USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can delete announcements"
  ON public.announcements FOR DELETE
  USING (public.is_staff(auth.uid()));

-- RLS Policies for gallery_items
CREATE POLICY "Public can view gallery items"
  ON public.gallery_items FOR SELECT
  USING (true);

CREATE POLICY "Staff can create gallery items"
  ON public.gallery_items FOR INSERT
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update gallery items"
  ON public.gallery_items FOR UPDATE
  USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can delete gallery items"
  ON public.gallery_items FOR DELETE
  USING (public.is_staff(auth.uid()));

-- RLS Policies for events
CREATE POLICY "Public can view events"
  ON public.events FOR SELECT
  USING (true);

CREATE POLICY "Staff can create events"
  ON public.events FOR INSERT
  WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update events"
  ON public.events FOR UPDATE
  USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can delete events"
  ON public.events FOR DELETE
  USING (public.is_staff(auth.uid()));

-- RLS Policies for ppdb_leads
CREATE POLICY "Anyone can submit ppdb leads"
  ON public.ppdb_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Staff can view ppdb leads"
  ON public.ppdb_leads FOR SELECT
  USING (public.is_staff(auth.uid()));

-- Create trigger function for profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- Trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample announcements
INSERT INTO public.announcements (title, slug, content, is_published, published_at) VALUES
('Pendaftaran Siswa Baru 2024/2025', 'pendaftaran-siswa-baru-2024-2025', 'Pendaftaran siswa baru KB Badan Wakaf UII untuk tahun ajaran 2024/2025 telah dibuka. Segera daftarkan putra-putri Anda untuk mendapatkan pengalaman belajar terbaik.', true, now()),
('Kegiatan Outdoor Class', 'kegiatan-outdoor-class', 'Dalam rangka memperingati Hari Anak Nasional, KB Badan Wakaf UII mengadakan kegiatan belajar di luar ruangan dengan tema "Bermain dan Belajar di Alam".', true, now() - interval '2 days'),
('Libur Semester Genap', 'libur-semester-genap', 'Pemberitahuan kepada seluruh orang tua bahwa libur semester genap akan berlangsung mulai tanggal 20 Desember hingga 5 Januari.', true, now() - interval '5 days');

-- Insert sample events
INSERT INTO public.events (title, description, start_date, end_date, location) VALUES
('Pentas Seni Akhir Tahun', 'Pertunjukan bakat siswa KB dalam seni, musik, dan tari', '2024-12-15', '2024-12-15', 'Aula Utama'),
('Kunjungan ke Kebun Binatang', 'Field trip edukasi mengenal satwa', '2024-11-20', '2024-11-20', 'Gembira Loka Zoo'),
('Hari Kartini', 'Peringatan hari Kartini dengan tema pakaian adat', '2024-04-21', '2024-04-21', 'KB Badan Wakaf UII'),
('Cooking Class', 'Belajar memasak makanan sehat bersama', '2024-10-15', '2024-10-15', 'Dapur Sekolah'),
('Sports Day', 'Hari olahraga dan permainan tradisional', '2024-08-17', '2024-08-17', 'Lapangan'),
('Graduation Day', 'Wisuda siswa KB', '2024-06-30', '2024-06-30', 'Aula Utama');

-- Insert sample gallery items
INSERT INTO public.gallery_items (title, image_url, category) VALUES
('Bermain Balok', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800', 'Kelas'),
('Mewarnai Bersama', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800', 'Kelas'),
('Senam Pagi', 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800', 'Kegiatan'),
('Bermain di Taman', 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800', 'Kegiatan'),
('Belajar Membaca', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', 'Kelas'),
('Cooking Class', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800', 'Kegiatan'),
('Field Trip', 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800', 'Outing'),
('Pentas Seni', 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800', 'Kegiatan'),
('Hari Kemerdekaan', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800', 'Kegiatan'),
('Bermain Musik', 'https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00?w=800', 'Kelas'),
('Playdough Fun', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800', 'Kelas'),
('Graduation', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800', 'Kegiatan');