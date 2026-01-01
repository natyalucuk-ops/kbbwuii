import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, MapPin, Phone, Sparkles } from "lucide-react";

const Ticker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    });
  };

  const tickerItems = [
    { icon: Clock, text: `Waktu Server: ${formatTime(currentTime)} WIB` },
    { icon: Calendar, text: formatDate(currentTime) },
    { icon: Sparkles, text: "Selamat Datang di KB Badan Wakaf UII!" },
    { icon: MapPin, text: "Jl. Kaliurang Km 14.5, Yogyakarta" },
    { icon: Phone, text: "Hubungi Kami: (0274) 895287" },
    { icon: Sparkles, text: "Pendaftaran Siswa Baru Tahun Ajaran 2025/2026 Dibuka!" },
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 text-white py-1 overflow-hidden shadow-sm">
      <div className="relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 mx-6"
            >
              <item.icon className="w-3 h-3 flex-shrink-0" />
              <span className="font-medium text-xs">
                {item.text}
              </span>
              <span className="mx-4 text-white/50">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Ticker;
