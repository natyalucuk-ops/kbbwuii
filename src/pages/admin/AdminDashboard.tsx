import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Images, Calendar, Users } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    announcements: 0,
    gallery: 0,
    events: 0,
    ppdbLeads: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [announcements, gallery, events, ppdb] = await Promise.all([
        supabase.from("announcements").select("id", { count: "exact", head: true }),
        supabase.from("gallery_items").select("id", { count: "exact", head: true }),
        supabase.from("events").select("id", { count: "exact", head: true }),
        supabase.from("ppdb_leads").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        announcements: announcements.count || 0,
        gallery: gallery.count || 0,
        events: events.count || 0,
        ppdbLeads: ppdb.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Pengumuman", value: stats.announcements, icon: Megaphone, color: "text-primary" },
    { title: "Foto Galeri", value: stats.gallery, icon: Images, color: "text-pink" },
    { title: "Kegiatan", value: stats.events, icon: Calendar, color: "text-secondary" },
    { title: "Pendaftar PPDB", value: stats.ppdbLeads, icon: Users, color: "text-mint" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">
        Dashboard Admin
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title} className="card-playful">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selamat Datang di Dashboard Admin</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>Gunakan menu di sidebar untuk mengelola:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Pengumuman</strong> - Tambah, edit, hapus pengumuman</li>
            <li><strong>Galeri</strong> - Kelola foto-foto kegiatan</li>
            <li><strong>Kegiatan</strong> - Atur jadwal dan event</li>
            <li><strong>Pendaftar PPDB</strong> - Lihat data calon siswa</li>
            <li><strong>Edit JSON</strong> - Edit data statis website (guru, fasilitas, dll)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
