import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profil from "./pages/Profil";
import Program from "./pages/Program";
import Fasilitas from "./pages/Fasilitas";
import Galeri from "./pages/Galeri";
import Pengumuman from "./pages/Pengumuman";
import PengumumanDetail from "./pages/PengumumanDetail";
import PPDB from "./pages/PPDB";
import Kontak from "./pages/Kontak";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPengumuman from "./pages/admin/AdminPengumuman";
import AdminGaleri from "./pages/admin/AdminGaleri";
import AdminKegiatan from "./pages/admin/AdminKegiatan";
import AdminPPDB from "./pages/admin/AdminPPDB";
import AdminGuru from "./pages/admin/AdminGuru";
import AdminProgram from "./pages/admin/AdminProgram";
import AdminFasilitas from "./pages/admin/AdminFasilitas";
import AdminTestimoni from "./pages/admin/AdminTestimoni";
import AdminSiteConfig from "./pages/admin/AdminSiteConfig";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminProfil from "./pages/admin/AdminProfil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/program" element={<Program />} />
          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/pengumuman" element={<Pengumuman />} />
          <Route path="/pengumuman/:slug" element={<PengumumanDetail />} />
          <Route path="/ppdb" element={<PPDB />} />
          <Route path="/kontak" element={<Kontak />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pengumuman" element={<AdminPengumuman />} />
            <Route path="galeri" element={<AdminGaleri />} />
            <Route path="kegiatan" element={<AdminKegiatan />} />
            <Route path="guru" element={<AdminGuru />} />
            <Route path="program" element={<AdminProgram />} />
            <Route path="fasilitas" element={<AdminFasilitas />} />
            <Route path="testimoni" element={<AdminTestimoni />} />
            <Route path="config" element={<AdminSiteConfig />} />
            <Route path="quotes" element={<AdminQuotes />} />
            <Route path="profil" element={<AdminProfil />} />
            <Route path="ppdb" element={<AdminPPDB />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
