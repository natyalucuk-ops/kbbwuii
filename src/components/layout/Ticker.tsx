import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, MapPin, Phone, Sparkles, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContactData {
  phone?: string;
  whatsapp?: string;
  address?: string;
}

const Ticker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      const { data, error } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "contact")
        .maybeSingle();

      if (!error && data?.value) {
        setContact(data.value as unknown as ContactData);
      }
    };

    fetchContact();
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

  const formatWhatsApp = (wa: string) => {
    if (wa.startsWith("62")) {
      return `0${wa.slice(2)}`;
    }
    return wa;
  };

  const tickerItems = [
    { icon: Clock, text: `Waktu Server: ${formatTime(currentTime)} WIB` },
    { icon: Calendar, text: formatDate(currentTime) },
    { icon: Sparkles, text: "Selamat Datang di KB Badan Wakaf UII!" },
    { icon: MapPin, text: contact?.address || "Jl. Kaliurang Km 14.5, Yogyakarta" },
    { icon: MessageCircle, text: `Hubungi Kami: ${contact?.whatsapp ? formatWhatsApp(contact.whatsapp) : "(0274) 895287"}` },
    { icon: Sparkles, text: "Pendaftaran Siswa Baru Tahun Ajaran 2025/2026 Dibuka!" },
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 text-white py-1.5 overflow-hidden shadow-md">
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
            <motion.div
              key={index}
              className="flex items-center gap-2 mx-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
              </motion.div>
              <span className="font-medium text-xs">
                {item.text}
              </span>
              <motion.span 
                className="mx-4 text-white/70"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
              >
                ✦
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Ticker;
