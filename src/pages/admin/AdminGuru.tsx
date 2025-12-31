import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string | null;
  sort_order: number;
}

const AdminGuru = () => {
  const [items, setItems] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    quote: "",
    sort_order: 0,
  });
  const { toast } = useToast();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("teachers")
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
      ...formData,
      quote: formData.quote || null,
    };

    if (editingItem) {
      const { error } = await supabase
        .from("teachers")
        .update(dataToSave)
        .eq("id", editingItem.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Data guru diperbarui" });
        fetchData();
        setDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from("teachers").insert({
        ...dataToSave,
        sort_order: items.length + 1,
      });

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Guru ditambahkan" });
        fetchData();
        setDialogOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data guru ini?")) return;

    const { error } = await supabase.from("teachers").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Berhasil", description: "Guru dihapus" });
      fetchData();
    }
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData({ name: "", role: "", image: "", quote: "", sort_order: 0 });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Teacher) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      image: item.image,
      quote: item.quote || "",
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
        <h1 className="text-2xl font-display font-bold">Kelola Data Guru</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Guru
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="aspect-square relative">
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
            <CardContent className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.role}</p>
              {item.quote && (
                <p className="text-xs text-muted-foreground mt-2 italic">"{item.quote}"</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Data Guru" : "Tambah Guru Baru"}
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
              <Label>Jabatan/Role</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Contoh: Kepala Sekolah"
                required
              />
            </div>
            <div>
              <Label>URL Foto</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
                required
              />
            </div>
            <div>
              <Label>Quote (opsional)</Label>
              <Textarea
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Kata-kata inspiratif..."
                rows={2}
              />
            </div>
            {formData.image && (
              <div>
                <Label>Preview</Label>
                <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-lg mt-2" />
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

export default AdminGuru;
