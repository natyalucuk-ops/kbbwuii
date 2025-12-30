import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { useToast } from "@/hooks/use-toast";

interface Announcement {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  published_at: string | null;
}

const PengumumanDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setAnnouncement(data);
      }
      setLoading(false);
    };

    fetchAnnouncement();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: announcement?.title,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link disalin!",
        description: "Link pengumuman telah disalin ke clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-main max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (notFound || !announcement) {
    return (
      <Layout>
        <div className="section-padding min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">
              Pengumuman Tidak Ditemukan
            </h1>
            <p className="text-muted-foreground mb-8">
              Pengumuman yang Anda cari tidak tersedia atau sudah dihapus.
            </p>
            <Link to="/pengumuman">
              <Button variant="default">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Daftar Pengumuman
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 bg-gradient-hero overflow-hidden">
        <FloatingElements variant="minimal" />
        <div className="container-main px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/pengumuman"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Pengumuman
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4 max-w-4xl">
              {announcement.title}
            </h1>
            
            <div className="flex items-center gap-4 flex-wrap">
              {announcement.published_at && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(announcement.published_at), "EEEE, d MMMM yyyy", { locale: id })}
                  </span>
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1" />
                Bagikan
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {announcement.cover_image_url && (
              <div className="rounded-3xl overflow-hidden mb-8 shadow-card">
                <img
                  src={announcement.cover_image_url}
                  alt={announcement.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
                {announcement.content}
              </div>
            </div>
          </motion.article>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <Link to="/pengumuman">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Lihat Pengumuman Lainnya
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PengumumanDetail;
