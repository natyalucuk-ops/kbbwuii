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

interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  sort_order: number;
}

const iconOptions = [
  "Gamepad2", "Heart", "BookOpen", "Palette", "Users", "Music", "Brain", "Star"
];

const colorOptions = [
  { value: "primary", label: "Primary (Ungu)" },
  { value: "pink", label: "Pink" },
  { value: "secondary", label: "Secondary (Kuning)" },
  { value: "mint", label: "Mint (Hijau)" },
  { value: "accent", label: "Accent (Oranye)" },
];

const AdminProgram = () => {
  const [items, setItems] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Program | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Star",
    color: "primary",
    features: "",
    sort_order: 0,
  });
  const { toast } = useToast();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) {
      setItems(data.map(item => ({
        ...item,
        features: Array.isArray(item.features) ? item.features as string[] : []
      })));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = formData.features
      .split("\n")
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const dataToSave = {
      title: formData.title,
      description: formData.description,
      icon: formData.icon,
      color: formData.color,
      features: featuresArray,
      sort_order: formData.sort_order,
    };

    if (editingItem) {
      const { error } = await supabase
        .from("programs")
        .update(dataToSave)
        .eq("id", editingItem.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Program diperbarui" });
        fetchData();
        setDialogOpen(false);
      }
    } else {
      const { error } = await supabase.from("programs").insert({
        ...dataToSave,
        sort_order: items.length + 1,
      });

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Program ditambahkan" });
        fetchData();
        setDialogOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus program ini?")) return;

    const { error } = await supabase.from("programs").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Berhasil", description: "Program dihapus" });
      fetchData();
    }
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData({ title: "", description: "", icon: "Star", color: "primary", features: "", sort_order: 0 });
    setDialogOpen(true);
  };

  const openEditDialog = (item: Program) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon,
      color: item.color,
      features: Array.isArray(item.features) ? item.features.join("\n") : "",
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
        <h1 className="text-2xl font-display font-bold">Kelola Program</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Program
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs bg-${item.color}/20`}>
                      {item.icon}
                    </span>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {Array.isArray(item.features) && item.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.features.map((f, i) => (
                        <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Program" : "Tambah Program Baru"}
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
              <Label>Deskripsi</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                <Label>Warna</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => setFormData({ ...formData, color: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((color) => (
                      <SelectItem key={color.value} value={color.value}>{color.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Fitur (satu per baris)</Label>
              <Textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
                rows={4}
              />
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

export default AdminProgram;
