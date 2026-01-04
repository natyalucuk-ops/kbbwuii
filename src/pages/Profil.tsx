import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FloatingElements, Star, Heart } from "@/components/decorations/FloatingElements";
import { Target, Eye, BookOpen, GraduationCap, Award, Users } from "lucide-react";
import { useSiteConfig, useTeachers } from "@/hooks/useSiteConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { icons } from "lucide-react";

interface ProfileData {
  schoolName: string;
  tagline: string;
  visi: string;
  misi: string[];
  sejarah: {
    title: string;
    content: string;
  };
  statistics: {
    value: string;
    label: string;
    icon: string;
    color: string;
  }[];
}

interface Teacher {
  id: string;
  name: string;
  role: string;
  image: string;
  quote?: string;
}

const colorClasses: Record<string, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  pink: "bg-pink",
  accent: "bg-accent",
  mint: "bg-mint",
  purple: "bg-purple-500",
};

const Profil = () => {
  const { data: profileData, loading: profileLoading } = useSiteConfig("profile");
  const { data: teachersData, loading: teachersLoading } = useTeachers();

  const profile = profileData as unknown as ProfileData | null;
  const teachers = teachersData as Teacher[];

  const getIcon = (iconName: string) => {
    const LucideIcon = (icons as Record<string, any>)[iconName];
    return LucideIcon || GraduationCap;
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
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Profil Sekolah
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary via-pink to-secondary bg-clip-text text-transparent">
                {profileLoading ? (
                  <Skeleton className="w-64 h-12 mx-auto" />
                ) : (
                  profile?.schoolName || "KB Badan Wakaf UII"
                )}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {profileLoading ? (
                <Skeleton className="w-80 h-5 mx-auto" />
              ) : (
                profile?.tagline || "Membentuk generasi cerdas, kreatif, dan berakhlak mulia sejak dini"
              )}
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
              {profileLoading ? (
                <div className="space-y-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-3/4 h-4" />
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  {profile?.visi || "Menjadi lembaga pendidikan anak usia dini terdepan yang menghasilkan generasi Qur'ani yang cerdas, kreatif, mandiri, dan berakhlak mulia berdasarkan nilai-nilai Islam."}
                </p>
              )}
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
              {profileLoading ? (
                <div className="space-y-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-3/4 h-4" />
                </div>
              ) : (
                <ul className="space-y-3 text-muted-foreground">
                  {(profile?.misi || [
                    "Menyelenggarakan pembelajaran berbasis Al-Quran dan Sunnah",
                    "Mengembangkan potensi anak melalui pendekatan bermain sambil belajar",
                    "Membangun karakter mandiri, kreatif, dan cinta lingkungan",
                    "Menjalin kemitraan dengan orang tua dalam mendidik anak"
                  ]).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
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
                {profileLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="w-48 h-6" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-3/4 h-4" />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {profile?.sejarah?.title || "Didirikan Tahun 2008"}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {profile?.sejarah?.content || "KB Badan Wakaf UII didirikan pada tahun 2008 di bawah naungan Badan Wakaf Universitas Islam Indonesia. Bermula dari keinginan untuk memberikan pendidikan berkualitas bagi anak usia dini dengan landasan nilai-nilai Islam."}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {profileLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="text-center p-4 bg-muted/50 rounded-2xl">
                    <Skeleton className="w-10 h-10 mx-auto mb-2 rounded-full" />
                    <Skeleton className="w-16 h-8 mx-auto mb-1" />
                    <Skeleton className="w-20 h-3 mx-auto" />
                  </div>
                ))
              ) : (
                (profile?.statistics || [
                  { value: "200+", label: "Alumni", icon: "GraduationCap", color: "primary" },
                  { value: "15+", label: "Tahun Pengalaman", icon: "Award", color: "secondary" },
                  { value: "8", label: "Tenaga Pendidik", icon: "Users", color: "accent" },
                ]).map((stat, index) => {
                  const IconComponent = getIcon(stat.icon);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`text-center p-4 bg-${stat.color}/10 rounded-2xl`}
                    >
                      <IconComponent className={`w-10 h-10 text-${stat.color} mx-auto mb-2`} />
                      <div className={`text-3xl font-display font-black text-${stat.color}`}>{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  );
                })
              )}
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
            {teachersLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card-playful text-center">
                  <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                  <Skeleton className="w-32 h-4 mx-auto mb-2" />
                  <Skeleton className="w-20 h-3 mx-auto" />
                </div>
              ))
            ) : (
              teachers.map((teacher, index) => {
                const colors = ["primary", "secondary", "pink", "accent", "mint", "purple"];
                const color = colors[index % colors.length];
                return (
                  <motion.div
                    key={teacher.id}
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
                        className={`absolute -bottom-1 -right-1 w-8 h-8 ${colorClasses[color] || "bg-primary"} rounded-full flex items-center justify-center shadow-soft`}
                      >
                        <Heart className="w-4 h-4 text-white fill-white" />
                      </motion.div>
                    </div>
                    <h3 className="font-display font-bold text-foreground text-sm md:text-base group-hover:text-primary transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm">{teacher.role}</p>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profil;
