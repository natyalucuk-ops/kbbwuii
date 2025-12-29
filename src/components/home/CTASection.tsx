import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { FloatingElements, Star, Heart } from "@/components/decorations/FloatingElements";

export const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-primary relative overflow-hidden">
      {/* Decorations */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%]"
      >
        <Star className="w-12 h-12 text-white/30" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-[15%]"
      >
        <Heart className="w-10 h-10 text-white/20" />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-[20%]"
      >
        <Star className="w-8 h-8 text-white/25" />
      </motion.div>

      <div className="container-main relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-primary-foreground mb-6"
          >
            Siap Bergabung Bersama Kami?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-primary-foreground/80 mb-8"
          >
            Daftarkan putra-putri Anda sekarang dan berikan mereka pengalaman 
            belajar terbaik di KB Badan Wakaf UII.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/ppdb">
              <Button 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90 shadow-float hover:scale-110 active:scale-100"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <a
              href="https://wa.me/62274895287?text=Halo,%20saya%20ingin%20bertanya%20tentang%20KB%20Badan%20Wakaf%20UII"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="xl">
                <MessageCircle className="w-5 h-5 mr-1" />
                Chat WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
