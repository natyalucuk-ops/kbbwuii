import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface Announcement {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  published_at: string | null;
}

const Pengumuman = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (!error && data) {
        setAnnouncements(data);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

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
            <span className="inline-block bg-accent/30 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Pengumuman
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
              Informasi &{" "}
              <span className="bg-gradient-to-r from-primary via-pink to-secondary bg-clip-text text-transparent">
                Berita
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tetap update dengan kegiatan dan pengumuman terbaru dari kami
            </p>
          </motion.div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="section-padding">
        <div className="container-main">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-playful">
                  <Skeleton className="h-48 rounded-2xl mb-4" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Belum ada pengumuman.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-playful group"
                >
                  {item.cover_image_url && (
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 -mx-6 -mt-6">
                      <img
                        src={item.cover_image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    {item.published_at && (
                      <span>
                        {format(new Date(item.published_at), "d MMMM yyyy", { locale: id })}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {item.content}
                  </p>
                  
                  <Link
                    to={`/pengumuman/${item.slug}`}
                    className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Pengumuman;
