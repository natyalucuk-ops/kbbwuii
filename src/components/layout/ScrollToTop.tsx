import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-primary rounded-full shadow-float flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket className="w-6 h-6 text-primary-foreground rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300" />
          </motion.div>
          {/* Exhaust effect */}
          <motion.div
            animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="absolute -bottom-1 w-4 h-4 bg-accent/50 rounded-full blur-sm"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
