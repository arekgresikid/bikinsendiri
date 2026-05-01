# Bikin Sendiri - No-Code Web Builder

Aplikasi ini memungkinkan siapa saja untuk membuat landing page profesional tanpa koding.

## Fitur Utama
- **Editor Visual**: Form input yang mudah digunakan untuk mengatur konten web.
- **Preview Real-time**: Lihat perubahan Anda secara instan dalam tampilan browser simulasi.
- **Desain Premium**: Template modern dengan estetika glassmorphism dan tipografi yang tajam.
- **Kustomisasi Warna**: Pilih warna utama yang sesuai dengan brand Anda.

## Parameter yang Bisa Diatur
- **Nama Situs**: Nama yang muncul di navigasi dan judul tab.
- **Header**: Judul utama dan sub-judul untuk menarik perhatian pengunjung.
- **Media**: URL gambar hero untuk bagian atas web.
- **Konten**: Deskripsi lengkap mengenai layanan atau produk Anda.
- **CTA (Call to Action)**: Teks tombol ajakan bertindak.
- **Warna & Font**: Sesuaikan palet warna dan pilihan font (Outfit, Inter, Roboto).

## Cara Menjalankan Secara Lokal
1. Pastikan Anda memiliki Node.js terinstal.
2. Jalankan `npm install` untuk menginstal dependensi.
3. Jalankan `npm run dev` untuk memulai server pengembangan.
4. Buka `http://localhost:3000` di browser Anda.

## Struktur Proyek
- `src/types/site.ts`: Definisi data untuk konfigurasi web.
- `src/components/builder/EditorPanel.tsx`: Komponen form editor.
- `src/components/builder/PreviewCanvas.tsx`: Komponen perender web.
- `src/app/page.tsx`: Dashboard utama aplikasi.
