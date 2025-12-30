import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface PPDBLead {
  id: string;
  parent_name: string;
  phone: string;
  email: string | null;
  child_name: string;
  child_age: number;
  notes: string | null;
  created_at: string;
}

const AdminPPDB = () => {
  const [leads, setLeads] = useState<PPDBLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("ppdb_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setLeads(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="animate-pulse">Memuat...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Data Pendaftar PPDB</h1>
        <span className="text-muted-foreground">{leads.length} pendaftar</span>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nama Anak</TableHead>
                  <TableHead>Usia</TableHead>
                  <TableHead>Nama Orang Tua</TableHead>
                  <TableHead>No. HP</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(lead.created_at), "d MMM yyyy", { locale: id })}
                    </TableCell>
                    <TableCell className="font-medium">{lead.child_name}</TableCell>
                    <TableCell>{lead.child_age} tahun</TableCell>
                    <TableCell>{lead.parent_name}</TableCell>
                    <TableCell>
                      <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                        {lead.phone}
                      </a>
                    </TableCell>
                    <TableCell>
                      {lead.email ? (
                        <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                          {lead.email}
                        </a>
                      ) : "-"}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{lead.notes || "-"}</TableCell>
                  </TableRow>
                ))}
                {leads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Belum ada pendaftar
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPPDB;
