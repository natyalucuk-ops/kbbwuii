import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FloatingElements, Star, Heart } from "@/components/decorations/FloatingElements";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Send, CheckCircle, Calendar, Users, FileText, Phone } from "lucide-react";

interface PPDBData {
  title: string;
  subtitle: string;
  isOpen: boolean;
  requirements: string[];
  registrationFee: string;
  monthlyFee: string;
}

interface ContactData {
  whatsapp: string;
}

const PPDB = () => {
  const [formData, setFormData] = useState({
    parent_name: "",
    phone: "",
    email: "",
    child_name: "",
    child_age: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const { data: ppdbData } = useSiteConfig("ppdb");
  const { data: contactData } = useSiteConfig("contact");
  
  const ppdb = ppdbData as unknown as PPDBData | null;
  const contact = contactData as unknown as ContactData | null;
  const whatsappNumber = contact?.whatsapp || "6281215561771";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.parent_name || !formData.phone || !formData.child_name || !formData.child_age) {
      toast({
        title: "Error",
        description: "Mohon lengkapi data yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("ppdb_leads").insert({
        parent_name: formData.parent_name,
        phone: formData.phone,
        email: formData.email || null,
        child_name: formData.child_name,
        child_age: parseInt(formData.child_age),
        notes: formData.notes || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Berhasil!",
        description: "Data Anda telah terkirim. Kami akan menghubungi Anda segera.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { icon: FileText, title: "Isi Formulir", desc: "Lengkapi form minat" },
    { icon: Phone, title: "Konfirmasi", desc: "Kami hubungi Anda" },
    { icon: Calendar, title: "Kunjungan", desc: "Jadwalkan kunjungan" },
    { icon: Users, title: "Daftar", desc: "Selesaikan pendaftaran" },
  ];

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
              {ppdb?.subtitle || "Tahun Ajaran 2025/2026"}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-6">
              {ppdb?.title || "Pendaftaran"}{" "}
              <span className="bg-gradient-to-r from-primary via-pink to-secondary bg-clip-text text-transparent">
                Siswa Baru
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Daftarkan putra-putri Anda dan berikan mereka pengalaman belajar terbaik
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-playful">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-foreground text-sm">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-display font-black text-foreground mb-6">
                Informasi Pendaftaran
              </h2>
              
              <div className="space-y-6">
                <div className="card-playful">
                  <h3 className="font-display font-bold text-foreground mb-2">Persyaratan</h3>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    {ppdb?.requirements?.map((req, index) => (
                      <li key={index}>• {req}</li>
                    )) || (
                      <>
                        <li>• Usia 3-6 tahun</li>
                        <li>• Fotokopi Akta Kelahiran</li>
                        <li>• Fotokopi Kartu Keluarga</li>
                        <li>• Pas foto 3x4 (3 lembar)</li>
                        <li>• Fotokopi KTP Orang Tua</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="card-playful">
                  <h3 className="font-display font-bold text-foreground mb-2">Biaya Pendaftaran</h3>
                  <div className="text-muted-foreground text-sm">
                    <p className="text-foreground font-semibold">Hubungi kami untuk informasi lebih lanjut.</p>
                  </div>
                </div>

                <div className="card-playful bg-gradient-primary text-primary-foreground">
                  <h3 className="font-display font-bold mb-2">Hubungi Kami</h3>
                  <p className="text-sm opacity-90 mb-3">
                    Ada pertanyaan? Hubungi kami via WhatsApp
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20bertanya%20tentang%20PPDB%20KB%20Badan%20Wakaf%20UII`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="sm">
                      Chat WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <div className="card-playful text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="w-20 h-20 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-mint" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    Terima Kasih!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Data Anda telah kami terima. Tim kami akan menghubungi Anda 
                    dalam 1-2 hari kerja.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Kirim Data Lagi
                  </Button>
                </div>
              ) : (
                <div className="card-playful">
                  <h3 className="text-xl font-display font-bold text-foreground mb-6">
                    Form Minat Pendaftaran
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parent_name">Nama Orang Tua *</Label>
                        <Input
                          id="parent_name"
                          value={formData.parent_name}
                          onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                          placeholder="Nama lengkap"
                          className="rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">No. WhatsApp *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="08xxxxxxxxxx"
                          className="rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Opsional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@contoh.com"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="child_name">Nama Anak *</Label>
                        <Input
                          id="child_name"
                          value={formData.child_name}
                          onChange={(e) => setFormData({ ...formData, child_name: e.target.value })}
                          placeholder="Nama lengkap anak"
                          className="rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="child_age">Usia Anak (tahun) *</Label>
                        <Input
                          id="child_age"
                          type="number"
                          min="2"
                          max="7"
                          value={formData.child_age}
                          onChange={(e) => setFormData({ ...formData, child_age: e.target.value })}
                          placeholder="4"
                          className="rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Catatan (Opsional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Pertanyaan atau catatan tambahan..."
                        className="rounded-xl min-h-[100px]"
                      />
                    </div>

                    <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Kirim Data
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PPDB;
