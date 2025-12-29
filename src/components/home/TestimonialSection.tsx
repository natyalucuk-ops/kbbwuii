import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ibu Dewi Rahmawati",
    role: "Orang Tua dari Aisyah (5 tahun)",
    content: "Anak saya sangat senang bersekolah di KB Badan Wakaf UII. Guru-gurunya ramah dan sabar. Perkembangan Aisyah sangat pesat, terutama dalam hal sosialisasi dan kreativitas.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Bapak Ahmad Fauzi",
    role: "Orang Tua dari Raffi (4 tahun)",
    content: "Metode play-based learning yang diterapkan sangat efektif. Raffi jadi lebih mandiri dan percaya diri. Terima kasih KB Badan Wakaf UII!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Ibu Siti Nurhaliza",
    role: "Orang Tua dari Zahra (5 tahun)",
    content: "Fasilitas lengkap dan lingkungan yang aman membuat kami tenang menitipkan anak. Zahra selalu cerita tentang kegiatan seru di sekolah.",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
  },
];

export const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card-playful text-center p-8 md:p-12"
          >
            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
            
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
              "{testimonials[currentIndex].content}"
            </p>
            
            <div className="flex flex-col items-center">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover shadow-soft mb-3"
              />
              <h4 className="font-display font-bold text-foreground">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
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
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
