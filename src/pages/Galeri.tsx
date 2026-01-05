import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Play } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  media_type: string | null;
}

const categories = ["Semua", "Kelas", "Kegiatan", "Outing"];

const Galeri = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setItems(data);
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

  const filteredItems = activeCategory === "Semua" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const isVideo = (url: string, mediaType: string | null) => {
    if (mediaType === "video") return true;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <FloatingElements variant="section" />
        <div className="container-main px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-pink/20 text-pink-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Galeri
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
              Momen{" "}
              <span className="bg-gradient-to-r from-primary via-pink to-secondary bg-clip-text text-transparent">
                Berharga
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Dokumentasi kegiatan belajar dan bermain yang penuh keceriaan
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-display font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-playful"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-main">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl" />
              ))}
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence>
                {filteredItems.map((item, index) => {
                  const itemIsVideo = isVideo(item.image_url, item.media_type);
                  
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      onClick={() => setSelectedItem(item)}
                      className="relative aspect-square rounded-2xl overflow-hidden shadow-card cursor-pointer group"
                    >
                      {itemIsVideo ? (
                        <>
                          <video
                            src={item.image_url}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            muted
                            playsInline
                            onMouseEnter={(e) => e.currentTarget.play()}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:opacity-0 transition-opacity"
                            >
                              <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                            </motion.div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                          {itemIsVideo && (
                            <span className="inline-block bg-accent/80 text-white text-xs px-2 py-1 rounded-full">
                              Video
                            </span>
                          )}
                        </div>
                        <h4 className="text-white font-semibold text-sm truncate">{item.title}</h4>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-card hover:scale-110 transition-transform"
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[80vh] rounded-3xl overflow-hidden shadow-float"
            >
              {isVideo(selectedItem.image_url, selectedItem.media_type) ? (
                <video
                  src={selectedItem.image_url}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedItem.image_url}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card px-6 py-3 rounded-2xl shadow-card"
            >
              <h3 className="font-display font-bold text-foreground">{selectedItem.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedItem.category}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Galeri;