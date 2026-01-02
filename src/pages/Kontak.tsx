import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FloatingElements } from "@/components/decorations/FloatingElements";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContactData {
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  operationalHours: string;
  googleMapsUrl: string;
}

const Kontak = () => {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "contact")
        .single();
      
      if (data?.value) {
        setContact(data.value as unknown as ContactData);
      }
      setLoading(false);
    };

    fetchContact();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const contactInfo = contact ? [
    {
      icon: MapPin,
      title: "Alamat",
      content: contact.address,
      color: "primary",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: contact.phone,
      color: "secondary",
    },
    {
      icon: Mail,
      title: "Email",
      content: contact.email,
      color: "accent",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: contact.operationalHours,
      color: "mint",
    },
  ] : [];

  const whatsappLink = contact?.whatsapp 
    ? `https://wa.me/${contact.whatsapp}?text=Halo,%20saya%20ingin%20bertanya%20tentang%20KB%20Badan%20Wakaf%20UII`
    : "#";

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
                {contact?.googleMapsUrl && (
                  <iframe
                    src={contact.googleMapsUrl.includes("embed") ? contact.googleMapsUrl : `https://www.google.com/maps/place/Kelompok+Bermain+Badan+Wakaf+UII/@-7.6879929,110.4082801,20.41z/data=!4m6!3m5!1s0x2e7a5e9682932aeb:0x35788d529bc30c71!8m2!3d-7.6879555!4d110.4083883!16s%2Fg%2F11dxpjyg9`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                )}
              </div>
              {contact?.googleMapsUrl && (
                <a
                  href={contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-4 hover:underline"
                >
                  Buka di Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
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
                href={whatsappLink}
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
