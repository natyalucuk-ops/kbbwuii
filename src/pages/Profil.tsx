import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FloatingElements, Star, Heart } from "@/components/decorations/FloatingElements";
import { Target, Eye, BookOpen, GraduationCap, Award, Users } from "lucide-react";

const teachers = [
  {
    name: "Ustadzah Siti Aminah, S.Pd",
    role: "Kepala Sekolah",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    color: "primary",
  },
  {
    name: "Ustadzah Nur Hidayah, S.Pd",
    role: "Guru Kelas",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
    color: "secondary",
  },
  {
    name: "Ustadzah Fatimah, S.Pd",
    role: "Guru Kelas",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop&crop=face",
    color: "pink",
  },
  {
    name: "Ustadzah Khadijah, S.Pd",
    role: "Guru Seni",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    color: "accent",
  },
  {
    name: "Ustadz Ahmad Ridwan, S.Pd",
    role: "Guru Olahraga",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    color: "mint",
  },
  {
    name: "Ustadzah Maryam, S.Psi",
    role: "Psikolog Anak",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop&crop=face",
    color: "purple",
  },
];

const Profil = () => {
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
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Profil Sekolah
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary via-pink to-secondary bg-clip-text text-transparent">
                KB Badan Wakaf UII
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Membentuk generasi cerdas, kreatif, dan berakhlak mulia sejak dini
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Visi */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-playful"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Visi</h2>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi lembaga pendidikan anak usia dini terdepan yang menghasilkan 
                generasi Qur'ani yang cerdas, kreatif, mandiri, dan berakhlak mulia 
                berdasarkan nilai-nilai Islam.
              </p>
            </motion.div>

            {/* Misi */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-playful"
            >
              <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">Misi</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Menyelenggarakan pembelajaran berbasis Al-Quran dan Sunnah</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Mengembangkan potensi anak melalui pendekatan bermain sambil belajar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Membangun karakter mandiri, kreatif, dan cinta lingkungan</span>
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Menjalin kemitraan dengan orang tua dalam mendidik anak</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sejarah Section */}
      <section id="sejarah" className="section-padding bg-muted/30">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-accent/30 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Sejarah
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
              Perjalanan Kami
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card-playful max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-mint/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-mint" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  Didirikan Tahun 2008
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  KB Badan Wakaf UII didirikan pada tahun 2008 di bawah naungan Badan Wakaf 
                  Universitas Islam Indonesia. Bermula dari keinginan untuk memberikan 
                  pendidikan berkualitas bagi anak usia dini dengan landasan nilai-nilai Islam.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-primary/5 rounded-2xl">
                <GraduationCap className="w-10 h-10 text-primary mx-auto mb-2" />
                <div className="text-3xl font-display font-black text-primary">200+</div>
                <p className="text-sm text-muted-foreground">Alumni</p>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-2xl">
                <Award className="w-10 h-10 text-secondary mx-auto mb-2" />
                <div className="text-3xl font-display font-black text-secondary">15+</div>
                <p className="text-sm text-muted-foreground">Tahun Pengalaman</p>
              </div>
              <div className="text-center p-4 bg-accent/20 rounded-2xl">
                <Users className="w-10 h-10 text-accent mx-auto mb-2" />
                <div className="text-3xl font-display font-black text-accent">8</div>
                <p className="text-sm text-muted-foreground">Tenaga Pendidik</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tenaga Pendidik Section */}
      <section id="guru" className="section-padding">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-pink/20 text-pink-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Tenaga Pendidik
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
              Guru-Guru Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tim pengajar profesional yang berdedikasi untuk perkembangan si kecil
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, rotate: 1 }}
                className="card-playful text-center group"
              >
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover rounded-full shadow-soft group-hover:scale-105 transition-transform duration-300"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute -bottom-1 -right-1 w-8 h-8 bg-${teacher.color} rounded-full flex items-center justify-center shadow-soft`}
                  >
                    <Heart className="w-4 h-4 text-white fill-white" />
                  </motion.div>
                </div>
                <h3 className="font-display font-bold text-foreground text-sm md:text-base group-hover:text-primary transition-colors">
                  {teacher.name}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">{teacher.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profil;
