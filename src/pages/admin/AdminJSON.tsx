import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink } from "lucide-react";

import teachersData from "@/data/teachers.json";
import programsData from "@/data/programs.json";
import facilitiesData from "@/data/facilities.json";
import testimonialsData from "@/data/testimonials.json";
import contactData from "@/data/contact.json";
import siteConfigData from "@/data/siteConfig.json";

const jsonFiles = [
  { key: "teachers", label: "Data Guru", data: teachersData, path: "src/data/teachers.json" },
  { key: "programs", label: "Program", data: programsData, path: "src/data/programs.json" },
  { key: "facilities", label: "Fasilitas", data: facilitiesData, path: "src/data/facilities.json" },
  { key: "testimonials", label: "Testimoni", data: testimonialsData, path: "src/data/testimonials.json" },
  { key: "contact", label: "Kontak", data: contactData, path: "src/data/contact.json" },
  { key: "siteConfig", label: "Konfigurasi", data: siteConfigData, path: "src/data/siteConfig.json" },
];

const AdminJSON = () => {
  const { toast } = useToast();

  const copyToClipboard = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast({ title: "Disalin!", description: "JSON telah disalin ke clipboard" });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Edit Data JSON</h1>
        <p className="text-muted-foreground mt-1">
          File JSON ini berisi data statis website yang bisa diedit manual melalui Code Editor.
        </p>
      </div>

      <Card className="mb-6 bg-accent/10 border-accent">
        <CardContent className="p-4">
          <h3 className="font-semibold text-accent-foreground mb-2">Cara Edit File JSON:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Buka <strong>Code Editor</strong> di Lovable (ikon {"</>"} di atas preview)</li>
            <li>Navigasi ke folder <code className="bg-muted px-1 rounded">src/data/</code></li>
            <li>Pilih file JSON yang ingin diedit</li>
            <li>Edit isi file sesuai kebutuhan</li>
            <li>Perubahan akan langsung terlihat di preview</li>
          </ol>
        </CardContent>
      </Card>

      <Tabs defaultValue="teachers">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-4">
          {jsonFiles.map((file) => (
            <TabsTrigger key={file.key} value={file.key} className="text-sm">
              {file.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {jsonFiles.map((file) => (
          <TabsContent key={file.key} value={file.key}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{file.label}</CardTitle>
                    <CardDescription className="font-mono text-xs mt-1">
                      {file.path}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(file.data)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy JSON
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs max-h-[500px]">
                  {JSON.stringify(file.data, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminJSON;
