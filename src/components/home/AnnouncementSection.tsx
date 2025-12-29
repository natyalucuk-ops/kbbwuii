import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

interface Announcement {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  published_at: string | null;
}

export const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (!error && data) {
        setAnnouncements(data);
      }
      setLoading(false);
    };

    fetchAnnouncements();
  }, []);

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="container-main relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-accent/30 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Pengumuman Terbaru
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
            Informasi & Berita
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tetap update dengan kegiatan dan pengumuman terbaru dari kami.
          </p>
        </motion.div>

        {/* Announcements Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card-playful">
                <Skeleton className="h-48 rounded-2xl mb-4" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/pengumuman"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Lihat Semua Pengumuman →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AnnouncementSection;
