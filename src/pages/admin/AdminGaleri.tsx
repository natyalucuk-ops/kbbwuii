import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Play, Image } from "lucide-react";
import ImageUpload from "@/components/ui/ImageUpload";

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  media_type: string | null;
}

const categories = ["Kelas", "Kegiatan", "Outing", "Acara", "Fasilitas"];

const AdminGaleri = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    category: "Kegiatan",
    media_type: "image" as "image" | "video",
  });
  const { toast } = useToast();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      const { error } = await supabase
        .from("gallery_items")
        .update(formData)
        .eq("id", editingItem.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Media diperbarui" });
        fetchData();
        setDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from("gallery_items").insert(formData);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Media ditambahkan" });
        fetchData();
        setDialogOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus media ini?")) return;

    const { error } = await supabase.from("gallery_items").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Berhasil", description: "Media dihapus" });
      fetchData();
    }
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData({ title: "", image_url: "", category: "Kegiatan", media_type: "image" });
    setDialogOpen(true);
  };

  const openEditDialog = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image_url: item.image_url,
      category: item.category,
      media_type: (item.media_type === "video" ? "video" : "image") as "image" | "video",
    });
    setDialogOpen(true);
  };

  const isVideo = (url: string, mediaType: string | null) => {
    if (mediaType === "video") return true;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  if (loading) {
    return <div className="animate-pulse">Memuat...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Kelola Galeri</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Media
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const itemIsVideo = isVideo(item.image_url, item.media_type);
          
          return (
            <Card key={item.id} className="overflow-hidden group">
              <div className="aspect-square relative">
                {itemIsVideo ? (
                  <>
                    <video
                      src={item.image_url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" onClick={() => openEditDialog(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  {itemIsVideo ? (
                    <Play className="w-3 h-3 text-accent" />
                  ) : (
                    <Image className="w-3 h-3 text-primary" />
                  )}
                  <p className="font-medium text-sm truncate">{item.title}</p>
                </div>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Media" : "Tambah Media"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Judul</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Tipe Media</Label>
              <Select
                value={formData.media_type}
                onValueChange={(value: "image" | "video") => setFormData({ ...formData, media_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">
                    <div className="flex items-center gap-2">
                      <Image className="w-4 h-4" />
                      Gambar
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Video
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{formData.media_type === "video" ? "Video" : "Gambar"}</Label>
              {formData.media_type === "video" ? (
                <div className="space-y-2">
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="URL video (mp4, webm, dll)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Masukkan URL video atau upload file video ke storage terlebih dahulu
                  </p>
                </div>
              ) : (
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  folder="gallery"
                />
              )}
            </div>
            <div>
              <Label>Kategori</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGaleri;