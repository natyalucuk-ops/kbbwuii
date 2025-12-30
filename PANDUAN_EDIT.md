# Panduan Mengedit Website KB Badan Wakaf UII

## 📁 Struktur Folder

```
src/
├── components/
│   ├── decorations/      # Elemen dekoratif (awan, bintang, balon)
│   ├── home/             # Komponen halaman beranda
│   ├── layout/           # Navbar, Footer, Layout
│   └── ui/               # Komponen UI (button, card, dll)
├── pages/                # Halaman-halaman website
│   ├── Index.tsx         # Halaman Beranda
│   ├── Profil.tsx        # Halaman Profil
│   ├── Program.tsx       # Halaman Program
│   ├── Fasilitas.tsx     # Halaman Fasilitas
│   ├── Galeri.tsx        # Halaman Galeri
│   ├── Pengumuman.tsx    # Halaman Pengumuman
│   ├── PPDB.tsx          # Halaman Pendaftaran
│   ├── Kontak.tsx        # Halaman Kontak
│   ├── Login.tsx         # Halaman Login Guru
│   └── NotFound.tsx      # Halaman 404
├── integrations/
│   └── supabase/         # Konfigurasi database (JANGAN DIUBAH)
├── index.css             # Design system (warna, font, animasi)
└── App.tsx               # Routing aplikasi
```

---

## 🎨 Mengubah Warna & Tema

Edit file `src/index.css` untuk mengubah warna:

```css
:root {
  /* Warna Utama (Coral/Orange) */
  --primary: 15 90% 60%;
  
  /* Warna Sekunder (Sky Blue) */
  --secondary: 195 85% 65%;
  
  /* Warna Aksen (Sunny Yellow) */
  --accent: 45 95% 60%;
  
  /* Warna Tambahan */
  --mint: 160 60% 70%;
  --pink: 340 80% 75%;
  --purple: 280 60% 70%;
}
```

---

## 📝 Mengubah Konten

### Mengubah Teks di Halaman Beranda

1. Buka `src/components/home/HeroSection.tsx`
2. Ubah teks di dalam tag `<h1>` atau `<p>`

### Mengubah Program

1. Buka `src/components/home/ProgramSection.tsx`
2. Edit array `programs` di bagian atas file

### Mengubah Fasilitas

1. Buka `src/components/home/FacilitySection.tsx`
2. Edit array `facilities`

### Mengubah Testimoni

1. Buka `src/components/home/TestimonialSection.tsx`
2. Edit array `testimonials`

---

## 🗃️ Database (Lovable Cloud)

Data dinamis disimpan di database:

| Tabel | Fungsi |
|-------|--------|
| `announcements` | Pengumuman |
| `gallery_items` | Foto galeri |
| `events` | Jadwal kegiatan |
| `ppdb_leads` | Data pendaftar PPDB |
| `profiles` | Profil user |
| `user_roles` | Role admin/guru |

### Menambah Pengumuman
1. Login sebagai admin
2. Buka Dashboard → Pengumuman → Tambah Baru

### Menambah Foto Galeri
1. Login sebagai admin
2. Buka Dashboard → Galeri → Upload Foto

---

## 👨‍🏫 Mengubah Data Guru

Edit file `src/pages/Profil.tsx`, cari array `teachers`:

```typescript
const teachers = [
  {
    name: "Nama Guru",
    role: "Kepala Sekolah",
    image: "URL_FOTO",
    quote: "Kutipan guru",
  },
  // Tambah guru lainnya...
];
```

---

## 🧭 Mengubah Menu Navigasi

Edit file `src/components/layout/Navbar.tsx`, cari array `navLinks`:

```typescript
const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  // Tambah/ubah menu lainnya...
];
```

---

## 📱 Mengubah Kontak

Edit file `src/pages/Kontak.tsx`:

```typescript
const contactInfo = {
  address: "Alamat lengkap",
  phone: "Nomor telepon",
  whatsapp: "Nomor WhatsApp",
  email: "Email",
  // ...
};
```

Juga edit di `src/components/layout/Footer.tsx` untuk footer.

---

## 🚀 Menambah Halaman Baru

1. Buat file baru di `src/pages/NamaHalaman.tsx`
2. Tambahkan route di `src/App.tsx`:

```typescript
<Route path="/url-halaman" element={<NamaHalaman />} />
```

3. Tambahkan link di navbar jika perlu

---

## ⚠️ File yang TIDAK BOLEH Diedit

- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `supabase/config.toml`
- `.env`

File-file ini dikelola otomatis oleh sistem.

---

## 🔐 Akun Admin/Guru

Untuk menambah akun guru baru:
1. Login sebagai admin
2. Buka Dashboard → Kelola User → Tambah Guru

---

## 💡 Tips

- Gunakan warna dari design system (`text-primary`, `bg-secondary`, dll)
- Jangan hardcode warna seperti `text-white` atau `bg-blue-500`
- Selalu test di mobile setelah perubahan
- Commit perubahan secara berkala
