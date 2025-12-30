import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat",
    content: "Jl. Kaliurang Km 14.5, Sleman, Yogyakarta 55584",
    color: "primary",
  },
  {
    icon: Phone,
    title: "Telepon",
    content: "(0274) 895287",
    color: "secondary",
  },
  {
    icon: Mail,
    title: "Email",
    content: "kb@bwuii.or.id",
    color: "accent",
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    content: "Senin - Jumat: 07.30 - 11.30 WIB",
    color: "mint",
  },
];

const Kontak = () => {
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
              Kontak
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
              Hubungi{" "}
              <span className="bg-gradient-to-r from-primary via-pink to-secondary bg-clip-text text-transparent">
                Kami
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Kami siap menjawab pertanyaan Anda seputar KB Badan Wakaf UII
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="card-playful text-center"
              >
                <div className={`w-14 h-14 bg-${info.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className={`w-7 h-7 text-${info.color}`} />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{info.title}</h3>
                <p className="text-muted-foreground text-sm">{info.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Map & WhatsApp */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-playful overflow-hidden"
            >
              <h3 className="font-display font-bold text-foreground text-xl mb-4">Lokasi Kami</h3>
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0663716974!2d110.41891231477474!3d-7.746481394421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59ce4c9c89ed%3A0x4027a76e352fdc0!2sUniversitas%20Islam%20Indonesia!5e0!3m2!1sid!2sid!4v1640000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              <a
                href="https://goo.gl/maps/YourLocationLink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-4 hover:underline"
              >
                Buka di Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-playful bg-gradient-primary text-primary-foreground flex flex-col justify-center"
            >
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6">
                <MessageCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-display font-black mb-4">
                Chat via WhatsApp
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Cara tercepat untuk menghubungi kami. Tim kami siap membantu 
                menjawab pertanyaan Anda seputar pendaftaran, program, 
                dan informasi lainnya.
              </p>
              <a
                href="https://wa.me/62274895287?text=Halo,%20saya%20ingin%20bertanya%20tentang%20KB%20Badan%20Wakaf%20UII"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="xl" 
                  className="bg-white text-primary hover:bg-white/90 shadow-float"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Mulai Chat WhatsApp
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontak;
