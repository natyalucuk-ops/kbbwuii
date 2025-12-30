import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { 
  Home, BookOpen, Palette, Music, TreePine, 
  UtensilsCrossed, Shield, Wifi
} from "lucide-react";

const facilities = [
  {
    icon: Home,
    title: "Ruang Kelas Nyaman",
    description: "4 ruang kelas ber-AC dengan peralatan edukatif lengkap dan dekorasi yang ramah anak.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
  },
  {
    icon: TreePine,
    title: "Playground Outdoor",
    description: "Area bermain outdoor dengan ayunan, perosotan, jungkat-jungkit, dan area pasir yang aman.",
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&h=500&fit=crop",
  },
  {
    icon: Palette,
    title: "Ruang Seni",
    description: "Ruang khusus untuk aktivitas seni seperti menggambar, mewarnai, dan kerajinan tangan.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=500&fit=crop",
  },
  {
    icon: BookOpen,
    title: "Perpustakaan Mini",
    description: "Koleksi 500+ buku cerita anak dengan area membaca yang nyaman dan menarik.",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=500&fit=crop",
  },
  {
    icon: Music,
    title: "Ruang Musik",
    description: "Berbagai alat musik anak seperti keyboard, gitar mini, drum, dan alat perkusi.",
    image: "https://images.unsplash.com/photo-1514649923863-ceaf75b7ec00?w=800&h=500&fit=crop",
  },
  {
    icon: UtensilsCrossed,
    title: "Dapur & Kantin",
    description: "Dapur bersih untuk kegiatan cooking class dan kantin sehat untuk snack time.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&h=500&fit=crop",
  },
];

const highlights = [
  { icon: Shield, text: "CCTV 24 Jam", color: "primary" },
  { icon: Wifi, text: "WiFi Tersedia", color: "secondary" },
  { icon: Home, text: "Ruangan Ber-AC", color: "accent" },
  { icon: TreePine, text: "Lingkungan Asri", color: "mint" },
];

const Fasilitas = () => {
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
            <span className="inline-block bg-mint/20 text-mint-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Fasilitas
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
              Lingkungan Belajar{" "}
              <span className="bg-gradient-to-r from-primary via-pink to-secondary bg-clip-text text-transparent">
                Terbaik
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Fasilitas lengkap dan aman untuk mendukung tumbuh kembang anak
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-10 h-10 bg-${item.color}/10 rounded-xl flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 text-${item.color}`} />
                </div>
                <span className="font-display font-semibold text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="card-playful overflow-hidden group"
              >
                <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <facility.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {facility.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {facility.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Fasilitas;
