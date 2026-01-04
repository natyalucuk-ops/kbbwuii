import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ProgramSection } from "@/components/home/ProgramSection";
import { FacilitySection } from "@/components/home/FacilitySection";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { AnnouncementSection } from "@/components/home/AnnouncementSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <QuoteSection />
      <ProgramSection />
      <FacilitySection />
      <GalleryTeaser />
      <AnnouncementSection />
      <TestimonialSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
