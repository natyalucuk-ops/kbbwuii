import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { Play, Heart, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      <FloatingElements variant="hero" />
      
      <div className="container-main px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Kelompok Bermain Terbaik di Yogyakarta</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-foreground mb-6 leading-tight"
          >
            Selamat Datang di{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              KB Badan Wakaf UII
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Tempat bermain dan belajar yang menyenangkan untuk si kecil. 
            Kami membentuk generasi cerdas, kreatif, dan berakhlak mulia dengan 
            pendekatan <strong className="text-foreground">play-based learning</strong>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/ppdb">
              <Button variant="hero" size="xl" className="group">
                <Play className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform" />
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/kontak">
              <Button variant="outline" size="lg" className="group">
                <Heart className="w-4 h-4 mr-1 group-hover:scale-110 group-hover:text-pink transition-all" />
                Hubungi Kami
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {[
              { value: "15+", label: "Tahun Pengalaman", color: "primary" },
              { value: "200+", label: "Alumni Berprestasi", color: "secondary" },
              { value: "8", label: "Guru Profesional", color: "accent" },
              { value: "5", label: "Program Unggulan", color: "mint" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                className="card-playful text-center p-4"
              >
                <div className={`text-3xl md:text-4xl font-display font-black mb-1 text-${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
