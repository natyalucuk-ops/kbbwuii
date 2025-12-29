import { motion } from "framer-motion";

export const Cloud = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse cx="30" cy="40" rx="25" ry="18" fill="currentColor" opacity="0.9" />
    <ellipse cx="55" cy="32" rx="30" ry="22" fill="currentColor" />
    <ellipse cx="75" cy="42" rx="22" ry="15" fill="currentColor" opacity="0.85" />
  </svg>
);

export const Star = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
  </svg>
);

export const Balloon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse cx="20" cy="20" rx="16" ry="20" fill="currentColor" />
    <path d="M20 40L18 44L22 44L20 40Z" fill="currentColor" opacity="0.8" />
    <path d="M20 44C20 44 18 55 20 58" stroke="currentColor" strokeWidth="1" opacity="0.6" />
  </svg>
);

export const Rainbow = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 120 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M10 60C10 32.386 32.386 10 60 10C87.614 10 110 32.386 110 60" stroke="#FF6B6B" strokeWidth="8" fill="none" />
    <path d="M18 60C18 36.804 36.804 18 60 18C83.196 18 102 36.804 102 60" stroke="#FFB347" strokeWidth="8" fill="none" />
    <path d="M26 60C26 41.222 41.222 26 60 26C78.778 26 94 41.222 94 60" stroke="#FFE66D" strokeWidth="8" fill="none" />
    <path d="M34 60C34 45.64 45.64 34 60 34C74.36 34 86 45.64 86 60" stroke="#88D8B0" strokeWidth="8" fill="none" />
    <path d="M42 60C42 50.059 50.059 42 60 42C69.941 42 78 50.059 78 60" stroke="#6BB9F0" strokeWidth="8" fill="none" />
  </svg>
);

export const Heart = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
  </svg>
);

interface FloatingElementsProps {
  variant?: "hero" | "section" | "minimal";
}

export const FloatingElements = ({ variant = "hero" }: FloatingElementsProps) => {
  if (variant === "minimal") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10"
        >
          <Star className="w-6 h-6 text-accent" />
        </motion.div>
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 left-[5%]"
        >
          <Cloud className="w-24 h-16 text-secondary/30" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[3%]"
        >
          <Star className="w-8 h-8 text-accent/50" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Clouds */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%]"
      >
        <Cloud className="w-32 h-20 text-white/80" />
      </motion.div>
      <motion.div
        animate={{ x: [0, -20, 0], y: [5, -15, 5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[15%] right-[10%]"
      >
        <Cloud className="w-40 h-24 text-white/70" />
      </motion.div>
      <motion.div
        animate={{ x: [10, -10, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[25%] left-[60%]"
      >
        <Cloud className="w-24 h-16 text-white/60" />
      </motion.div>

      {/* Stars */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[20%]"
      >
        <Star className="w-8 h-8 text-accent" />
      </motion.div>
      <motion.div
        animate={{ scale: [1.1, 0.9, 1.1], rotate: [10, -10, 10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[35%] right-[25%]"
      >
        <Star className="w-6 h-6 text-pink" />
      </motion.div>
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-[30%] left-[15%]"
      >
        <Star className="w-10 h-10 text-secondary" />
      </motion.div>

      {/* Balloons */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[8%]"
      >
        <Balloon className="w-12 h-18 text-primary" />
      </motion.div>
      <motion.div
        animate={{ y: [15, -25, 15], x: [-3, 3, -3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] right-[8%]"
      >
        <Balloon className="w-10 h-15 text-mint" />
      </motion.div>
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[40%] right-[15%]"
      >
        <Balloon className="w-8 h-12 text-pink" />
      </motion.div>

      {/* Rainbow - positioned subtly */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2"
      >
        <Rainbow className="w-[500px] h-60" />
      </motion.div>

      {/* Hearts */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], y: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[50%] left-[3%]"
      >
        <Heart className="w-6 h-6 text-pink/70" />
      </motion.div>
      <motion.div
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[60%] right-[5%]"
      >
        <Heart className="w-5 h-5 text-primary/60" />
      </motion.div>
    </div>
  );
};

export default FloatingElements;
