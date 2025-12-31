import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";

interface ConfigItem {
  id: string;
  key: string;
  value: any;
}

const AdminSiteConfig = () => {
  const [configs, setConfigs] = useState<ConfigItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  // Form states for each config
  const [heroForm, setHeroForm] = useState({
    badge: "",
    title: "",
    titleHighlight: "",
    subtitle: "",
    ctaPrimary: "",
    ctaSecondary: "",
  });

  const [statsForm, setStatsForm] = useState<Array<{ value: string; label: string }>>([]);
  
  const [contactForm, setContactForm] = useState({
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    operationalHours: "",
    googleMapsUrl: "",
  });

  const [ppdbForm, setPpdbForm] = useState({
    title: "",
    subtitle: "",
    isOpen: true,
    requirements: "",
    registrationFee: "",
    monthlyFee: "",
  });

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("site_config")
      .select("*");

    if (!error && data) {
      setConfigs(data);
      
      // Populate forms
      data.forEach((config) => {
        const val = config.value as any;
        if (config.key === "hero" && val) {
          setHeroForm({
            badge: val.badge || "",
            title: val.title || "",
            titleHighlight: val.titleHighlight || "",
            subtitle: val.subtitle || "",
            ctaPrimary: val.ctaPrimary || "",
            ctaSecondary: val.ctaSecondary || "",
          });
        }
        if (config.key === "stats" && Array.isArray(val)) {
          setStatsForm(val as Array<{ value: string; label: string }>);
        }
        if (config.key === "contact" && val) {
          setContactForm({
            address: val.address || "",
            phone: val.phone || "",
            whatsapp: val.whatsapp || "",
            email: val.email || "",
            operationalHours: val.operationalHours || "",
            googleMapsUrl: val.googleMapsUrl || "",
          });
        }
        if (config.key === "ppdb" && val) {
          setPpdbForm({
            title: val.title || "",
            subtitle: val.subtitle || "",
            isOpen: val.isOpen ?? true,
            requirements: Array.isArray(val.requirements) 
              ? val.requirements.join("\n") 
              : "",
            registrationFee: val.registrationFee || "",
            monthlyFee: val.monthlyFee || "",
          });
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveConfig = async (key: string, value: any) => {
    setSaving(key);
    
    const { error } = await supabase
      .from("site_config")
      .update({ value })
      .eq("key", key);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Berhasil", description: `Konfigurasi ${key} disimpan` });
    }
    
    setSaving(null);
  };

  const handleSaveHero = () => saveConfig("hero", heroForm);
  
  const handleSaveStats = () => saveConfig("stats", statsForm);
  
  const handleSaveContact = () => saveConfig("contact", contactForm);
  
  const handleSavePpdb = () => {
    const ppdbData = {
      ...ppdbForm,
      requirements: ppdbForm.requirements.split("\n").map(r => r.trim()).filter(r => r),
    };
    saveConfig("ppdb", ppdbData);
  };

  const addStat = () => {
    setStatsForm([...statsForm, { value: "", label: "" }]);
  };

  const removeStat = (index: number) => {
    setStatsForm(statsForm.filter((_, i) => i !== index));
  };

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    const updated = [...statsForm];
    updated[index][field] = value;
    setStatsForm(updated);
  };

  if (loading) {
    return <div className="animate-pulse">Memuat...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Konfigurasi Website</h1>

      <Tabs defaultValue="hero">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="stats">Statistik</TabsTrigger>
          <TabsTrigger value="contact">Kontak</TabsTrigger>
          <TabsTrigger value="ppdb">PPDB</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Badge Text</Label>
                <Input
                  value={heroForm.badge}
                  onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                  placeholder="Kelompok Bermain Terbaik di Yogyakarta"
                />
              </div>
              <div>
                <Label>Judul</Label>
                <Input
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  placeholder="Selamat Datang di"
                />
              </div>
              <div>
                <Label>Judul Highlight</Label>
                <Input
                  value={heroForm.titleHighlight}
                  onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                  placeholder="KB Badan Wakaf UII"
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Textarea
                  value={heroForm.subtitle}
                  onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tombol Utama</Label>
                  <Input
                    value={heroForm.ctaPrimary}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaPrimary: e.target.value })}
                    placeholder="Daftar Sekarang"
                  />
                </div>
                <div>
                  <Label>Tombol Sekunder</Label>
                  <Input
                    value={heroForm.ctaSecondary}
                    onChange={(e) => setHeroForm({ ...heroForm, ctaSecondary: e.target.value })}
                    placeholder="Hubungi Kami"
                  />
                </div>
              </div>
              <Button onClick={handleSaveHero} disabled={saving === "hero"}>
                {saving === "hero" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Simpan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Statistik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {statsForm.map((stat, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label>Nilai</Label>
                    <Input
                      value={stat.value}
                      onChange={(e) => updateStat(index, "value", e.target.value)}
                      placeholder="15+"
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Label</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => updateStat(index, "label", e.target.value)}
                      placeholder="Tahun Pengalaman"
                    />
                  </div>
                  <Button variant="outline" size="icon" onClick={() => removeStat(index)}>
                    ×
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addStat}>
                + Tambah Statistik
              </Button>
              <div>
                <Button onClick={handleSaveStats} disabled={saving === "stats"}>
                  {saving === "stats" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Alamat</Label>
                <Input
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Telepon</Label>
                  <Input
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input
                    value={contactForm.whatsapp}
                    onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                    placeholder="6281234567890"
                  />
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  type="email"
                />
              </div>
              <div>
                <Label>Jam Operasional</Label>
                <Input
                  value={contactForm.operationalHours}
                  onChange={(e) => setContactForm({ ...contactForm, operationalHours: e.target.value })}
                  placeholder="Senin - Jumat, 07.30 - 12.00 WIB"
                />
              </div>
              <div>
                <Label>URL Google Maps</Label>
                <Input
                  value={contactForm.googleMapsUrl}
                  onChange={(e) => setContactForm({ ...contactForm, googleMapsUrl: e.target.value })}
                />
              </div>
              <Button onClick={handleSaveContact} disabled={saving === "contact"}>
                {saving === "contact" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Simpan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ppdb">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan PPDB</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Judul</Label>
                <Input
                  value={ppdbForm.title}
                  onChange={(e) => setPpdbForm({ ...ppdbForm, title: e.target.value })}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={ppdbForm.subtitle}
                  onChange={(e) => setPpdbForm({ ...ppdbForm, subtitle: e.target.value })}
                  placeholder="Tahun Ajaran 2024/2025"
                />
              </div>
              <div>
                <Label>Persyaratan (satu per baris)</Label>
                <Textarea
                  value={ppdbForm.requirements}
                  onChange={(e) => setPpdbForm({ ...ppdbForm, requirements: e.target.value })}
                  rows={5}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Biaya Pendaftaran</Label>
                  <Input
                    value={ppdbForm.registrationFee}
                    onChange={(e) => setPpdbForm({ ...ppdbForm, registrationFee: e.target.value })}
                  />
                </div>
                <div>
                  <Label>SPP Bulanan</Label>
                  <Input
                    value={ppdbForm.monthlyFee}
                    onChange={(e) => setPpdbForm({ ...ppdbForm, monthlyFee: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleSavePpdb} disabled={saving === "ppdb"}>
                {saving === "ppdb" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Simpan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSiteConfig;
