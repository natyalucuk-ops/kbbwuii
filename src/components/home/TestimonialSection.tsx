import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/useSiteConfig";
import { Skeleton } from "@/components/ui/skeleton";

export const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonials, loading } = useTestimonials();

  // Reset index if it's out of bounds
  useEffect(() => {
    if (currentIndex >= testimonials.length && testimonials.length > 0) {
      setCurrentIndex(0);
    }
  }, [testimonials.length, currentIndex]);

  const nextSlide = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevSlide = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-main relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-mint/30 text-mint-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
            Apa Kata Orang Tua?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pengalaman para orang tua yang telah mempercayakan putra-putri mereka kepada kami.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="card-playful text-center p-8 md:p-12">
              <Skeleton className="w-12 h-12 mx-auto mb-6 rounded-full" />
              <Skeleton className="w-full h-6 mb-2" />
              <Skeleton className="w-3/4 h-6 mx-auto mb-8" />
              <Skeleton className="w-16 h-16 mx-auto rounded-full mb-3" />
              <Skeleton className="w-32 h-4 mx-auto mb-1" />
              <Skeleton className="w-48 h-3 mx-auto" />
            </div>
          ) : currentTestimonial ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="card-playful text-center p-8 md:p-12"
            >
              <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
              
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                "{currentTestimonial.content}"
              </p>
              
              <div className="flex flex-col items-center">
                <img
                  src={currentTestimonial.image || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"}
                  alt={currentTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover shadow-soft mb-3"
                />
                <h4 className="font-display font-bold text-foreground">
                  {currentTestimonial.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentTestimonial.role}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="card-playful text-center p-8">
              <p className="text-muted-foreground">Belum ada testimoni</p>
            </div>
          )}

          {/* Navigation */}
          {testimonials.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex 
                        ? "bg-primary w-8" 
                        : "bg-muted hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
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
      </div>
    </section>
  );
};

export default TestimonialSection;
