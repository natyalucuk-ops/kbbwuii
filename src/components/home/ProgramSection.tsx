import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Music, 
  Brain, 
  Users, 
  BookOpen 
} from "lucide-react";
import { FloatingElements } from "@/components/decorations/FloatingElements";

const programs = [
  {
    icon: Brain,
    title: "Stimulasi Kognitif",
    description: "Mengembangkan kemampuan berpikir, memecahkan masalah, dan kreativitas anak.",
    color: "primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Palette,
    title: "Seni & Kreativitas",
    description: "Menggambar, mewarnai, dan kerajinan tangan untuk mengasah kreativitas.",
    color: "pink",
    bgColor: "bg-pink/20",
  },
  {
    icon: Music,
    title: "Musik & Gerak",
    description: "Bernyanyi, menari, dan bermain musik untuk perkembangan motorik.",
    color: "accent",
    bgColor: "bg-accent/20",
  },
  {
    icon: Users,
    title: "Keterampilan Sosial",
    description: "Belajar bersosialisasi, berbagi, dan bekerja sama dengan teman.",
    color: "secondary",
    bgColor: "bg-secondary/20",
  },
  {
    icon: BookOpen,
    title: "Literasi Awal",
    description: "Pengenalan huruf, angka, dan kecintaan pada buku sejak dini.",
    color: "mint",
    bgColor: "bg-mint/20",
  },
];

export const ProgramSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <FloatingElements variant="section" />
      
      <div className="container-main relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Program Unggulan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-foreground mb-4">
            Belajar Sambil Bermain
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Program pembelajaran yang dirancang khusus untuk mengembangkan 
            potensi anak secara holistik melalui aktivitas yang menyenangkan.
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, rotate: 1 }}
              className="card-playful group cursor-pointer"
            >
              <div className={`w-16 h-16 ${program.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <program.icon className={`w-8 h-8 text-${program.color}`} />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {program.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/program"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Lihat Semua Program
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramSection;
