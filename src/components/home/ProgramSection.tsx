import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Music, 
  Brain, 
  Users, 
  BookOpen,
  Heart,
  Gamepad2,
  Star
} from "lucide-react";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { usePrograms } from "@/hooks/useSiteConfig";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: { [key: string]: any } = {
  Palette,
  Music,
  Brain,
  Users,
  BookOpen,
  Heart,
  Gamepad2,
  Star,
};

const colorBgMap: { [key: string]: string } = {
  primary: "bg-primary/10",
  pink: "bg-pink/20",
  accent: "bg-accent/20",
  secondary: "bg-secondary/20",
  mint: "bg-mint/20",
};

export const ProgramSection = () => {
  const { data: programs, loading } = usePrograms();

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
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="card-playful">
                <Skeleton className="w-16 h-16 rounded-2xl mb-4" />
                <Skeleton className="w-32 h-6 mb-2" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4 mt-1" />
              </div>
            ))
          ) : (
            programs.map((program, index) => {
              const IconComponent = iconMap[program.icon] || Star;
              const bgColor = colorBgMap[program.color] || "bg-primary/10";
              
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, rotate: 1 }}
                  className="card-playful group cursor-pointer"
                >
                  <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 text-${program.color}`} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {program.description}
                  </p>
                </motion.div>
              );
            })
          )}
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
