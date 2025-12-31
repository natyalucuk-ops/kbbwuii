-- Create teachers table
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT NOT NULL,
  quote TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Star',
  color TEXT NOT NULL DEFAULT 'primary',
  features JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create facilities table
CREATE TABLE public.facilities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Building',
  image TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  rating INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_config table (key-value store for site settings)
CREATE TABLE public.site_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public can view teachers" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Public can view programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Public can view facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Public can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view site config" ON public.site_config FOR SELECT USING (true);

-- Staff can manage all data
CREATE POLICY "Staff can manage teachers" ON public.teachers FOR ALL USING (is_staff(auth.uid()));
CREATE POLICY "Staff can manage programs" ON public.programs FOR ALL USING (is_staff(auth.uid()));
CREATE POLICY "Staff can manage facilities" ON public.facilities FOR ALL USING (is_staff(auth.uid()));
CREATE POLICY "Staff can manage testimonials" ON public.testimonials FOR ALL USING (is_staff(auth.uid()));
CREATE POLICY "Staff can manage site config" ON public.site_config FOR ALL USING (is_staff(auth.uid()));

-- Create triggers for updated_at
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_facilities_updated_at BEFORE UPDATE ON public.facilities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON public.site_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial data from JSON files

-- Teachers
INSERT INTO public.teachers (name, role, image, quote, sort_order) VALUES
('Ibu Siti Aminah, S.Pd', 'Kepala Sekolah', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'Setiap anak adalah bintang yang bersinar dengan caranya sendiri', 1),
('Ibu Dewi Lestari, S.Pd', 'Guru Kelas', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'Belajar sambil bermain adalah kunci kebahagiaan anak', 2),
('Ibu Ratna Sari', 'Guru Pendamping', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400', 'Kasih sayang adalah fondasi pembelajaran terbaik', 3),
('Bapak Ahmad Fadli', 'Guru Olahraga', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 'Tubuh sehat, pikiran cerdas', 4);

-- Programs
INSERT INTO public.programs (title, description, icon, color, features, sort_order) VALUES
('Sentra Bermain', 'Pembelajaran berbasis sentra dengan pendekatan bermain sambil belajar yang menyenangkan', 'Gamepad2', 'primary', '["Sentra balok", "Sentra seni", "Sentra persiapan", "Sentra bahan alam"]', 1),
('Pendidikan Karakter', 'Pembentukan akhlak mulia dan nilai-nilai Islam dalam keseharian', 'Heart', 'pink', '["Doa harian", "Hafalan surat pendek", "Akhlak mulia", "Cerita Islami"]', 2),
('Pengembangan Bahasa', 'Stimulasi kemampuan berbahasa melalui dongeng, lagu, dan komunikasi aktif', 'BookOpen', 'secondary', '["Dongeng interaktif", "Lagu anak", "Kosakata baru", "Public speaking mini"]', 3),
('Kreativitas & Seni', 'Eksplorasi seni rupa, musik, dan gerak untuk mengembangkan kreativitas', 'Palette', 'mint', '["Mewarnai", "Kolase", "Musik & gerak", "Hasta karya"]', 4),
('Life Skills', 'Pembelajaran keterampilan hidup sehari-hari untuk kemandirian anak', 'Users', 'accent', '["Makan sendiri", "Merapikan mainan", "Toilet training", "Berbagi dengan teman"]', 5);

-- Facilities
INSERT INTO public.facilities (name, description, icon, image, sort_order) VALUES
('Ruang Kelas Nyaman', 'Ruang kelas ber-AC dengan dekorasi menarik dan furnitur ramah anak', 'School', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', 1),
('Area Bermain Outdoor', 'Taman bermain dengan permainan edukatif yang aman dan menyenangkan', 'TreePine', 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800', 2),
('Mushola Mini', 'Tempat ibadah untuk pembiasaan sholat dan kegiatan keagamaan', 'Heart', 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800', 3),
('Perpustakaan Anak', 'Koleksi buku cerita bergambar dan ensiklopedia anak', 'BookOpen', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800', 4),
('Ruang Seni & Musik', 'Ruang khusus untuk kegiatan seni rupa dan musik', 'Music', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', 5),
('Kantin Sehat', 'Menyediakan makanan dan minuman sehat untuk anak-anak', 'Utensils', 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800', 6);

-- Testimonials
INSERT INTO public.testimonials (name, role, content, image, rating, sort_order) VALUES
('Ibu Anisa Rahman', 'Orang Tua Murid', 'Anak saya sangat senang bersekolah di KB Badan Wakaf UII. Guru-gurunya sabar dan penuh perhatian. Perkembangan anak saya sangat pesat!', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', 5, 1),
('Bapak Hendra Wijaya', 'Orang Tua Murid', 'Kurikulum yang diterapkan sangat bagus, menggabungkan pendidikan umum dan agama dengan cara yang menyenangkan untuk anak-anak.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 5, 2),
('Ibu Kartika Sari', 'Orang Tua Murid', 'Fasilitas lengkap dan lingkungan yang aman. Anak saya menjadi lebih mandiri dan percaya diri setelah bersekolah di sini.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 5, 3);

-- Site Config
INSERT INTO public.site_config (key, value) VALUES
('hero', '{
  "badge": "Kelompok Bermain Terbaik di Yogyakarta",
  "title": "Selamat Datang di",
  "titleHighlight": "KB Badan Wakaf UII",
  "subtitle": "Tempat bermain dan belajar yang menyenangkan untuk si kecil. Kami membentuk generasi cerdas, kreatif, dan berakhlak mulia dengan pendekatan play-based learning.",
  "ctaPrimary": "Daftar Sekarang",
  "ctaSecondary": "Hubungi Kami"
}'::jsonb),
('stats', '[
  { "value": "15+", "label": "Tahun Pengalaman" },
  { "value": "200+", "label": "Alumni Berprestasi" },
  { "value": "8", "label": "Guru Profesional" },
  { "value": "5", "label": "Program Unggulan" }
]'::jsonb),
('contact', '{
  "address": "Jl. Kaliurang Km 14.5, Sleman, Yogyakarta",
  "phone": "0274-896123",
  "whatsapp": "6281234567890",
  "email": "info@kbbwuii.sch.id",
  "operationalHours": "Senin - Jumat, 07.30 - 12.00 WIB",
  "googleMapsUrl": "https://maps.google.com/?q=-7.7372,110.3925"
}'::jsonb),
('ppdb', '{
  "title": "Pendaftaran Peserta Didik Baru",
  "subtitle": "Tahun Ajaran 2024/2025",
  "isOpen": true,
  "requirements": [
    "Usia 3-6 tahun",
    "Fotokopi Akta Kelahiran",
    "Fotokopi Kartu Keluarga",
    "Pas foto 3x4 (3 lembar)",
    "Fotokopi KTP Orang Tua"
  ],
  "registrationFee": "Rp 500.000",
  "monthlyFee": "Rp 350.000"
}'::jsonb);