import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string | null;
  sort_order: number;
}

const iconOptions = [
  "School", "TreePine", "Heart", "BookOpen", "Music", "Utensils", "Building", "Palette", "Users"
];

const AdminFasilitas = () => {
  const [items, setItems] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Facility | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "Building",
    image: "",
    sort_order: 0,
  });
  const { toast } = useToast();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("facilities")
      .select("*")
      .order("sort_order", { ascending: true });

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

    const dataToSave = {
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      image: formData.image || null,
      sort_order: formData.sort_order,
    };

    if (editingItem) {
      const { error } = await supabase
        .from("facilities")
        .update(dataToSave)
        .eq("id", editingItem.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Fasilitas diperbarui" });
        fetchData();
        setDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from("facilities").insert({
        ...dataToSave,
        sort_order: items.length + 1,
      });

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Fasilitas ditambahkan" });
        fetchData();
        setDialogOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus fasilitas ini?")) return;

    const { error } = await supabase.from("facilities").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Berhasil", description: "Fasilitas dihapus" });
      fetchData();
    }
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData({ name: "", description: "", icon: "Building", image: "", sort_order: 0 });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Facility) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      icon: item.icon,
      image: item.image || "",
      sort_order: item.sort_order,
    });
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="animate-pulse">Memuat...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Kelola Fasilitas</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Fasilitas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            {item.image && (
              <div className="aspect-video relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" onClick={() => openEditDialog(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-muted px-2 py-0.5 rounded">{item.icon}</span>
                <h3 className="font-semibold">{item.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              {!item.image && (
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                    <Pencil className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-3 h-3 mr-1 text-destructive" /> Hapus
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Fasilitas" : "Tambah Fasilitas Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nama</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Deskripsi</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
              />
            </div>
            <div>
              <Label>Icon</Label>
              <Select
                value={formData.icon}
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>URL Gambar (opsional)</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            {formData.image && (
              <div>
                <Label>Preview</Label>
                <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg mt-2" />
              </div>
            )}
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

export default AdminFasilitas;
