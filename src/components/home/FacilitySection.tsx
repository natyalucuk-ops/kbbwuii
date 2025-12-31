import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useFacilities } from "@/hooks/useSiteConfig";
import { Skeleton } from "@/components/ui/skeleton";

export const FacilitySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: facilities, loading } = useFacilities();

  const nextSlide = () => {
    if (facilities.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % facilities.length);
    }
  };

  const prevSlide = () => {
    if (facilities.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
    }
  };

  const currentFacility = facilities[currentIndex];

  return (
    <section className="section-padding bg-gradient-playful relative overflow-hidden">
      <div className="container-main relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-secondary/30 text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Fasilitas Kami
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
            Lingkungan Belajar Terbaik
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fasilitas lengkap dan aman untuk mendukung tumbuh kembang anak.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {loading ? (
            <div className="relative rounded-3xl overflow-hidden shadow-card aspect-video">
              <Skeleton className="w-full h-full" />
            </div>
          ) : currentFacility ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-card aspect-video">
                <img
                  src={currentFacility.image || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop"}
                  alt={currentFacility.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                    {currentFacility.name}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base">
                    {currentFacility.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Tidak ada fasilitas untuk ditampilkan
            </div>
          )}

          {/* Navigation */}
          {facilities.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex gap-2">
                {facilities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex 
                        ? "bg-primary w-8" 
                        : "bg-muted hover:bg-primary/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            to="/fasilitas"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Lihat Semua Fasilitas →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FacilitySection;
