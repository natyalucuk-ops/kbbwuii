import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react";
import { Star, Cloud, Balloon } from "@/components/decorations/FloatingElements";

const footerLinks = {
  menu: [
    { href: "/", label: "Beranda" },
    { href: "/profil", label: "Profil" },
    { href: "/program", label: "Program" },
    { href: "/galeri", label: "Galeri" },
    { href: "/pengumuman", label: "Pengumuman" },
  ],
  layanan: [
    { href: "/ppdb", label: "Pendaftaran" },
    { href: "/fasilitas", label: "Fasilitas" },
    { href: "/kontak", label: "Kontak" },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-secondary/20 to-secondary/40 pt-16 pb-8 overflow-hidden">
      {/* Decorations */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-[10%]"
      >
        <Cloud className="w-24 h-16 text-white/50" />
      </motion.div>
      <motion.div
        animate={{ y: [5, -15, 5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-16 right-[15%]"
      >
        <Cloud className="w-32 h-20 text-white/40" />
      </motion.div>
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[5%]"
      >
        <Balloon className="w-8 h-12 text-primary/50" />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-[8%]"
      >
        <Star className="w-6 h-6 text-accent/60" />
      </motion.div>

      <div className="container-main px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-playful">
                <Star className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  KB Badan Wakaf UII
                </h3>
                <p className="text-xs text-muted-foreground">Kelompok Bermain</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Membentuk generasi cerdas, kreatif, dan berakhlak mulia melalui 
              pendekatan bermain sambil belajar yang menyenangkan.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Menu</h4>
            <ul className="space-y-2">
              {footerLinks.menu.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Layanan</h4>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Hubungi Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Jl. Kaliurang Km 14.5, Sleman, Yogyakarta 55584</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>(0274) 895287</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>kb@bwuii.or.id</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Sen - Jum: 07.30 - 11.30 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {new Date().getFullYear()} KB Badan Wakaf UII. Dibuat dengan 
              <Heart className="w-4 h-4 text-pink fill-pink inline" />
              untuk anak Indonesia.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Login Guru
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
