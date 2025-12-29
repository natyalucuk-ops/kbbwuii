import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
}

export const GalleryTeaser = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .limit(6)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setImages(data);
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

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
          <span className="inline-block bg-pink/20 text-pink-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Galeri Kegiatan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
            Momen Berharga Si Kecil
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dokumentasi kegiatan belajar dan bermain yang penuh keceriaan.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-card group cursor-pointer"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded-full mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/galeri"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Lihat Galeri Lengkap →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryTeaser;
