-- Drop existing restrictive policies and recreate as permissive

-- Teachers table
DROP POLICY IF EXISTS "Public can view teachers" ON public.teachers;
DROP POLICY IF EXISTS "Staff can manage teachers" ON public.teachers;

CREATE POLICY "Public can view teachers" 
ON public.teachers FOR SELECT 
USING (true);

CREATE POLICY "Staff can insert teachers" 
ON public.teachers FOR INSERT 
TO authenticated
WITH CHECK (is_staff(auth.uid()));

CREATE POLICY "Staff can update teachers" 
ON public.teachers FOR UPDATE 
TO authenticated
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can delete teachers" 
ON public.teachers FOR DELETE 
TO authenticated
USING (is_staff(auth.uid()));

-- Programs table
DROP POLICY IF EXISTS "Public can view programs" ON public.programs;
DROP POLICY IF EXISTS "Staff can manage programs" ON public.programs;

CREATE POLICY "Public can view programs" 
ON public.programs FOR SELECT 
USING (true);

CREATE POLICY "Staff can insert programs" 
ON public.programs FOR INSERT 
TO authenticated
WITH CHECK (is_staff(auth.uid()));

CREATE POLICY "Staff can update programs" 
ON public.programs FOR UPDATE 
TO authenticated
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can delete programs" 
ON public.programs FOR DELETE 
TO authenticated
USING (is_staff(auth.uid()));

-- Facilities table
DROP POLICY IF EXISTS "Public can view facilities" ON public.facilities;
DROP POLICY IF EXISTS "Staff can manage facilities" ON public.facilities;

CREATE POLICY "Public can view facilities" 
ON public.facilities FOR SELECT 
USING (true);

CREATE POLICY "Staff can insert facilities" 
ON public.facilities FOR INSERT 
TO authenticated
WITH CHECK (is_staff(auth.uid()));

CREATE POLICY "Staff can update facilities" 
ON public.facilities FOR UPDATE 
TO authenticated
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can delete facilities" 
ON public.facilities FOR DELETE 
TO authenticated
USING (is_staff(auth.uid()));

-- Testimonials table
DROP POLICY IF EXISTS "Public can view active testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Staff can manage testimonials" ON public.testimonials;

CREATE POLICY "Public can view active testimonials" 
ON public.testimonials FOR SELECT 
USING (is_active = true);

CREATE POLICY "Staff can view all testimonials" 
ON public.testimonials FOR SELECT 
TO authenticated
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can insert testimonials" 
ON public.testimonials FOR INSERT 
TO authenticated
WITH CHECK (is_staff(auth.uid()));

CREATE POLICY "Staff can update testimonials" 
ON public.testimonials FOR UPDATE 
TO authenticated
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can delete testimonials" 
ON public.testimonials FOR DELETE 
TO authenticated
USING (is_staff(auth.uid()));

-- Site config table
DROP POLICY IF EXISTS "Public can view site config" ON public.site_config;
DROP POLICY IF EXISTS "Staff can manage site config" ON public.site_config;

CREATE POLICY "Public can view site config" 
ON public.site_config FOR SELECT 
USING (true);

CREATE POLICY "Staff can insert site config" 
ON public.site_config FOR INSERT 
TO authenticated
WITH CHECK (is_staff(auth.uid()));

CREATE POLICY "Staff can update site config" 
ON public.site_config FOR UPDATE 
TO authenticated
USING (is_staff(auth.uid()));

CREATE POLICY "Staff can delete site config" 
ON public.site_config FOR DELETE 
TO authenticated
USING (is_staff(auth.uid()));