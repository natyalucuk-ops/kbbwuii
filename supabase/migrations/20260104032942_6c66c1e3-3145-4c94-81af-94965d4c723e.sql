-- Create quotes table for random quotes on homepage
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Public can view active quotes
CREATE POLICY "Public can view active quotes"
ON public.quotes
FOR SELECT
USING (is_active = true);

-- Staff can manage quotes
CREATE POLICY "Staff can view all quotes"
ON public.quotes
FOR SELECT
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can insert quotes"
ON public.quotes
FOR INSERT
WITH CHECK (is_staff(auth.uid()));

CREATE POLICY "Staff can update quotes"
ON public.quotes
FOR UPDATE
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can delete quotes"
ON public.quotes
FOR DELETE
USING (is_staff(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_quotes_updated_at
BEFORE UPDATE ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default quotes
INSERT INTO public.quotes (content, author, is_active, sort_order) VALUES
('Anak-anak adalah seperti semen basah, apapun yang jatuh padanya akan membentuk karakternya.', 'Haim Ginott', true, 1),
('Bermain adalah pekerjaan anak-anak.', 'Jean Piaget', true, 2),
('Setiap anak adalah seniman. Masalahnya adalah bagaimana tetap menjadi seniman saat dewasa.', 'Pablo Picasso', true, 3),
('Pendidikan bukan persiapan untuk hidup, pendidikan adalah hidup itu sendiri.', 'John Dewey', true, 4),
('Anak yang dididik dengan cinta akan menyebarkan cinta.', 'Anonim', true, 5),
('Masa kecil yang bahagia adalah fondasi untuk kehidupan yang bahagia.', 'Anonim', true, 6),
('Bermain adalah cara anak belajar tentang dunia.', 'Fred Rogers', true, 7),
('Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.', 'HR. Ahmad', true, 8);

-- Insert profile config into site_config
INSERT INTO public.site_config (key, value) VALUES
('profile', '{
  "schoolName": "KB Badan Wakaf UII",
  "tagline": "Membentuk generasi cerdas, kreatif, dan berakhlak mulia sejak dini",
  "visi": "Menjadi lembaga pendidikan anak usia dini terdepan yang menghasilkan generasi Qurani yang cerdas, kreatif, mandiri, dan berakhlak mulia berdasarkan nilai-nilai Islam.",
  "misi": [
    "Menyelenggarakan pembelajaran berbasis Al-Quran dan Sunnah",
    "Mengembangkan potensi anak melalui pendekatan bermain sambil belajar",
    "Membangun karakter mandiri, kreatif, dan cinta lingkungan",
    "Menjalin kemitraan dengan orang tua dalam mendidik anak"
  ],
  "sejarah": {
    "title": "Didirikan Tahun 2008",
    "content": "KB Badan Wakaf UII didirikan pada tahun 2008 di bawah naungan Badan Wakaf Universitas Islam Indonesia. Bermula dari keinginan untuk memberikan pendidikan berkualitas bagi anak usia dini dengan landasan nilai-nilai Islam."
  },
  "statistics": [
    { "value": "200+", "label": "Alumni", "icon": "GraduationCap", "color": "primary" },
    { "value": "15+", "label": "Tahun Pengalaman", "icon": "Award", "color": "secondary" },
    { "value": "8", "label": "Tenaga Pendidik", "icon": "Users", "color": "accent" }
  ]
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;