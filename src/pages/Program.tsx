import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { 
  Brain, Palette, Music, Users, BookOpen, Heart, 
  Sun, Moon, Clock, Calendar
} from "lucide-react";

const programs = [
  {
    icon: Brain,
    title: "Stimulasi Kognitif",
    description: "Mengembangkan kemampuan berpikir logis, memecahkan masalah, dan kreativitas melalui permainan edukatif.",
    features: ["Puzzle & Logika", "Eksperimen Sains", "Problem Solving"],
    color: "primary",
  },
  {
    icon: Palette,
    title: "Seni & Kreativitas",
    description: "Mengasah kreativitas melalui berbagai aktivitas seni seperti menggambar, mewarnai, dan kerajinan tangan.",
    features: ["Menggambar & Mewarnai", "Kerajinan Tangan", "Seni Rupa"],
    color: "pink",
  },
  {
    icon: Music,
    title: "Musik & Gerak",
    description: "Mengembangkan motorik dan kepekaan seni melalui bernyanyi, menari, dan bermain alat musik.",
    features: ["Bernyanyi", "Menari", "Bermain Musik"],
    color: "accent",
  },
  {
    icon: Users,
    title: "Keterampilan Sosial",
    description: "Belajar bersosialisasi, berbagi, bekerja sama, dan berkomunikasi dengan teman sebaya.",
    features: ["Kerja Tim", "Berbagi", "Komunikasi"],
    color: "secondary",
  },
  {
    icon: BookOpen,
    title: "Literasi Awal",
    description: "Pengenalan huruf, angka, dan menumbuhkan kecintaan pada membaca sejak dini.",
    features: ["Mengenal Huruf", "Mengenal Angka", "Storytelling"],
    color: "mint",
  },
  {
    icon: Heart,
    title: "Pendidikan Akhlak",
    description: "Penanaman nilai-nilai Islam dan akhlak mulia dalam kehidupan sehari-hari.",
    features: ["Hafalan Doa", "Adab", "Kisah Nabi"],
    color: "purple",
  },
];

const dailySchedule = [
  { time: "07.30 - 08.00", activity: "Penyambutan & Morning Circle", icon: Sun },
  { time: "08.00 - 08.30", activity: "Muroja'ah & Doa", icon: BookOpen },
  { time: "08.30 - 09.30", activity: "Kegiatan Inti (Sentra)", icon: Brain },
  { time: "09.30 - 10.00", activity: "Snack Time", icon: Heart },
  { time: "10.00 - 10.30", activity: "Outdoor Play", icon: Users },
  { time: "10.30 - 11.00", activity: "Story Time & Penutup", icon: Moon },
];

const Program = () => {
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
            <span className="inline-block bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Program & Kegiatan
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
              Belajar Sambil{" "}
              <span className="bg-gradient-to-r from-primary via-pink to-secondary bg-clip-text text-transparent">
                Bermain
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Program pembelajaran yang dirancang untuk mengembangkan potensi anak secara holistik
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="card-playful group"
              >
                <div className={`w-16 h-16 bg-${program.color}/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <program.icon className={`w-8 h-8 text-${program.color}`} />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {program.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {program.features.map((feature) => (
                    <span
                      key={feature}
                      className={`text-xs px-3 py-1 rounded-full bg-${program.color}/10 text-${program.color}`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="section-padding bg-muted/30">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-accent/30 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Clock className="w-4 h-4 inline mr-1" />
              Jadwal Harian
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
              Kegiatan Sehari-hari
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {dailySchedule.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-20 text-right">
                  <span className="text-sm font-semibold text-primary">{item.time}</span>
                </div>
                <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-soft">
                  <item.icon className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 card-playful py-3 px-4">
                  <span className="font-display font-semibold text-foreground">
                    {item.activity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kurikulum Info */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-mint/20 text-mint-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Kurikulum
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
                Play-Based Learning
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Kami menerapkan pendekatan bermain sambil belajar (play-based learning) 
                yang sesuai dengan tahap perkembangan anak usia dini. Setiap aktivitas 
                dirancang untuk menstimulasi perkembangan kognitif, motorik, sosial-emosional, 
                dan spiritual anak.
              </p>
              <div className="space-y-3">
                {["Berbasis Sentra", "Student-Centered", "Holistic Development", "Islamic Values"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center">
                      <span className="text-mint text-xs">✓</span>
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop"
                  alt="Play-based learning"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-card p-4 rounded-2xl shadow-card"
              >
                <Calendar className="w-8 h-8 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Program;
