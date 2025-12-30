# Panduan Mengedit Website KB Badan Wakaf UII

## 📁 Struktur Folder

```
src/
├── data/                 # FILE JSON UNTUK DATA STATIS
│   ├── teachers.json     # Data guru
│   ├── programs.json     # Program pembelajaran
│   ├── facilities.json   # Fasilitas sekolah
│   ├── testimonials.json # Testimoni orang tua
│   ├── contact.json      # Info kontak
│   └── siteConfig.json   # Konfigurasi website
├── pages/
│   ├── admin/            # Dashboard Admin
│   └── ...               # Halaman publik
└── ...
```

---

## 🔐 Dashboard Admin

Akses dashboard admin di: `/admin`

**Fitur:**
- **Pengumuman** - Tambah, edit, hapus pengumuman
- **Galeri** - Kelola foto kegiatan
- **Kegiatan** - Atur jadwal dan event
- **Pendaftar PPDB** - Lihat data calon siswa
- **Edit JSON** - Lihat/copy data statis

**Cara Login:**
1. Buka `/login`
2. Masukkan email & password admin
3. Setelah login, akses `/admin`

---

## 📝 Edit Data via JSON (Manual)

File JSON ada di folder `src/data/`. Edit via Code Editor:

| File | Isi |
|------|-----|
| `teachers.json` | Data guru (nama, foto, jabatan) |
| `programs.json` | Program pembelajaran |
| `facilities.json` | Daftar fasilitas |
| `testimonials.json` | Testimoni orang tua |
| `contact.json` | Alamat, telepon, email |
| `siteConfig.json` | Judul, visi misi, statistik |

**Cara Edit:**
1. Buka Code Editor (ikon `</>`)
2. Buka folder `src/data/`
3. Pilih file JSON
4. Edit sesuai kebutuhan
5. Save - perubahan langsung terlihat

---

## 🗃️ Edit Data via Database (Dashboard)

Data dinamis di database, kelola via Dashboard Admin:

| Data | Menu Admin |
|------|------------|
| Pengumuman | `/admin/pengumuman` |
| Galeri | `/admin/galeri` |
| Kegiatan | `/admin/kegiatan` |
| Pendaftar | `/admin/ppdb` |

---

## ⚠️ File yang TIDAK BOLEH Diedit

- `src/integrations/supabase/`
- `supabase/config.toml`
- `.env`

---

## 💡 Tips

- Data statis → Edit file JSON
- Data dinamis → Gunakan Dashboard Admin
- Selalu test di mobile setelah perubahan
