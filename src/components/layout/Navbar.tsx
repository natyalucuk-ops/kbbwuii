import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Star } from "@/components/decorations/FloatingElements";

const navLinks = [
  { href: "/", label: "Beranda" },
  {
    href: "/profil",
    label: "Profil",
    children: [
      { href: "/profil", label: "Visi & Misi" },
      { href: "/profil#sejarah", label: "Sejarah" },
      { href: "/profil#guru", label: "Tenaga Pendidik" },
    ],
  },
  { href: "/program", label: "Program & Kegiatan" },
  { href: "/fasilitas", label: "Fasilitas" },
  { href: "/galeri", label: "Galeri" },
  { href: "/pengumuman", label: "Pengumuman" },
  { href: "/ppdb", label: "PPDB" },
  { href: "/kontak", label: "Kontak" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-main px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-playful"
            >
              <Star className="w-7 h-7 text-primary-foreground" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg text-foreground leading-tight">
                KB Badan Wakaf UII
              </h1>
              <p className="text-xs text-muted-foreground">Kelompok Bermain</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`relative px-4 py-2 font-display font-semibold text-sm transition-colors rounded-xl flex items-center gap-1 ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-4 h-4" />}
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-primary rounded-full"
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-card rounded-2xl shadow-card p-2 min-w-[180px]"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent/20 rounded-xl transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link to="/ppdb" className="hidden md:block">
              <Button variant="hero" size="sm">
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/login" className="hidden md:block">
              <Button variant="ghost" size="sm">
                Login Guru
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-accent/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block px-4 py-3 font-display font-semibold rounded-xl transition-colors ${
                        location.pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent/20"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 space-y-2">
                  <Link to="/ppdb" className="block">
                    <Button variant="hero" className="w-full">
                      Daftar Sekarang
                    </Button>
                  </Link>
                  <Link to="/login" className="block">
                    <Button variant="outline" className="w-full">
                      Login Guru
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
