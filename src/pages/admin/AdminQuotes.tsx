import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, Quote } from "lucide-react";

interface QuoteItem {
  id: string;
  content: string;
  author: string | null;
  is_active: boolean;
  sort_order: number;
}

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchQuotes = async () => {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) {
      setQuotes(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleAddQuote = async () => {
    const newQuote = {
      content: "Quote baru",
      author: "",
      is_active: true,
      sort_order: quotes.length + 1,
    };

    const { data, error } = await supabase
      .from("quotes")
      .insert(newQuote)
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Gagal menambah quote",
        variant: "destructive",
      });
    } else if (data) {
      setQuotes([...quotes, data]);
      toast({ title: "Berhasil", description: "Quote baru ditambahkan" });
    }
  };

  const handleUpdateQuote = async (id: string, updates: Partial<QuoteItem>) => {
    setSaving(true);
    const { error } = await supabase
      .from("quotes")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan quote",
        variant: "destructive",
      });
    } else {
      setQuotes(quotes.map(q => q.id === id ? { ...q, ...updates } : q));
      toast({ title: "Berhasil", description: "Quote berhasil disimpan" });
    }
    setSaving(false);
  };

  const handleDeleteQuote = async (id: string) => {
    const { error } = await supabase
      .from("quotes")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus quote",
        variant: "destructive",
      });
    } else {
      setQuotes(quotes.filter(q => q.id !== id));
      toast({ title: "Berhasil", description: "Quote berhasil dihapus" });
    }
  };

  if (loading) {
    return <div className="p-6">Memuat...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kelola Quotes</h1>
          <p className="text-muted-foreground">
            Quote akan ditampilkan secara random di halaman utama
          </p>
        </div>
        <Button onClick={handleAddQuote}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Quote
        </Button>
      </div>

      <div className="grid gap-4">
        {quotes.map((quote) => (
          <Card key={quote.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Quote className="w-4 h-4" />
                  Quote #{quote.sort_order}
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={quote.is_active}
                      onCheckedChange={(checked) =>
                        handleUpdateQuote(quote.id, { is_active: checked })
                      }
                    />
                    <Label className="text-sm">Aktif</Label>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteQuote(quote.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Isi Quote</Label>
                <Textarea
                  value={quote.content}
                  onChange={(e) =>
                    setQuotes(quotes.map(q =>
                      q.id === quote.id ? { ...q, content: e.target.value } : q
                    ))
                  }
                  placeholder="Masukkan quote..."
                  rows={3}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Penulis/Sumber</Label>
                  <Input
                    value={quote.author || ""}
                    onChange={(e) =>
                      setQuotes(quotes.map(q =>
                        q.id === quote.id ? { ...q, author: e.target.value } : q
                      ))
                    }
                    placeholder="Nama penulis..."
                  />
                </div>
                <div className="w-24">
                  <Label>Urutan</Label>
                  <Input
                    type="number"
                    value={quote.sort_order}
                    onChange={(e) =>
                      setQuotes(quotes.map(q =>
                        q.id === quote.id ? { ...q, sort_order: parseInt(e.target.value) || 0 } : q
                      ))
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() =>
                  handleUpdateQuote(quote.id, {
                    content: quote.content,
                    author: quote.author,
                    sort_order: quote.sort_order,
                  })
                }
                disabled={saving}
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Simpan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {quotes.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Belum ada quote. Klik "Tambah Quote" untuk menambahkan.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminQuotes;
