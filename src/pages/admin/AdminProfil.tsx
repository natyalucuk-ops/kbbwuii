import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";

interface StatisticItem {
  value: string;
  label: string;
  icon: string;
  color: string;
}

interface ProfileData {
  schoolName: string;
  tagline: string;
  visi: string;
  misi: string[];
  sejarah: {
    title: string;
    content: string;
  };
  statistics: StatisticItem[];
}

const defaultProfile: ProfileData = {
  schoolName: "KB Badan Wakaf UII",
  tagline: "Membentuk generasi cerdas, kreatif, dan berakhlak mulia sejak dini",
  visi: "",
  misi: [],
  sejarah: { title: "", content: "" },
  statistics: [],
};

const AdminProfil = () => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "profile")
        .maybeSingle();

      if (!error && data?.value) {
        setProfile(data.value as unknown as ProfileData);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_config")
      .update({ value: JSON.parse(JSON.stringify(profile)) })
      .eq("key", "profile");

    if (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan profil",
        variant: "destructive",
      });
    } else {
      toast({ title: "Berhasil", description: "Profil berhasil disimpan" });
    }
    setSaving(false);
  };

  const addMisi = () => {
    setProfile({ ...profile, misi: [...profile.misi, ""] });
  };

  const removeMisi = (index: number) => {
    setProfile({
      ...profile,
      misi: profile.misi.filter((_, i) => i !== index),
    });
  };

  const updateMisi = (index: number, value: string) => {
    const newMisi = [...profile.misi];
    newMisi[index] = value;
    setProfile({ ...profile, misi: newMisi });
  };

  const addStatistic = () => {
    setProfile({
      ...profile,
      statistics: [
        ...profile.statistics,
        { value: "0", label: "Label", icon: "Star", color: "primary" },
      ],
    });
  };

  const removeStatistic = (index: number) => {
    setProfile({
      ...profile,
      statistics: profile.statistics.filter((_, i) => i !== index),
    });
  };

  const updateStatistic = (index: number, field: keyof StatisticItem, value: string) => {
    const newStats = [...profile.statistics];
    newStats[index] = { ...newStats[index], [field]: value };
    setProfile({ ...profile, statistics: newStats });
  };

  if (loading) {
    return <div className="p-6">Memuat...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kelola Profil Sekolah</h1>
          <p className="text-muted-foreground">
            Edit informasi profil yang ditampilkan di halaman Profil
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Simpan Semua
        </Button>
      </div>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Dasar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nama Sekolah</Label>
            <Input
              value={profile.schoolName}
              onChange={(e) => setProfile({ ...profile, schoolName: e.target.value })}
            />
          </div>
          <div>
            <Label>Tagline</Label>
            <Input
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Visi */}
      <Card>
        <CardHeader>
          <CardTitle>Visi</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={profile.visi}
            onChange={(e) => setProfile({ ...profile, visi: e.target.value })}
            rows={4}
            placeholder="Masukkan visi sekolah..."
          />
        </CardContent>
      </Card>

      {/* Misi */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Misi</CardTitle>
            <Button onClick={addMisi} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Misi
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {profile.misi.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => updateMisi(index, e.target.value)}
                placeholder={`Misi ${index + 1}`}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeMisi(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {profile.misi.length === 0 && (
            <p className="text-muted-foreground text-sm">Belum ada misi. Klik tambah untuk menambahkan.</p>
          )}
        </CardContent>
      </Card>

      {/* Sejarah */}
      <Card>
        <CardHeader>
          <CardTitle>Sejarah</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Judul Sejarah</Label>
            <Input
              value={profile.sejarah.title}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  sejarah: { ...profile.sejarah, title: e.target.value },
                })
              }
              placeholder="Contoh: Didirikan Tahun 2008"
            />
          </div>
          <div>
            <Label>Isi Sejarah</Label>
            <Textarea
              value={profile.sejarah.content}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  sejarah: { ...profile.sejarah, content: e.target.value },
                })
              }
              rows={4}
              placeholder="Ceritakan sejarah sekolah..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Statistik</CardTitle>
            <Button onClick={addStatistic} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Statistik
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.statistics.map((stat, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Nilai</Label>
                <Input
                  value={stat.value}
                  onChange={(e) => updateStatistic(index, "value", e.target.value)}
                  placeholder="200+"
                />
              </div>
              <div className="flex-1">
                <Label>Label</Label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStatistic(index, "label", e.target.value)}
                  placeholder="Alumni"
                />
              </div>
              <div className="w-32">
                <Label>Icon</Label>
                <Input
                  value={stat.icon}
                  onChange={(e) => updateStatistic(index, "icon", e.target.value)}
                  placeholder="GraduationCap"
                />
              </div>
              <div className="w-28">
                <Label>Warna</Label>
                <Input
                  value={stat.color}
                  onChange={(e) => updateStatistic(index, "color", e.target.value)}
                  placeholder="primary"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeStatistic(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {profile.statistics.length === 0 && (
            <p className="text-muted-foreground text-sm">Belum ada statistik.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfil;
