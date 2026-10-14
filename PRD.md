# Product Requirements Document (PRD)
## Project: PPT-AI-Generator (Gamma AI Clone)

### 1. Overview & Objective
PPT-AI-Generator adalah aplikasi web modern bertenaga AI untuk membuat presentasi visual berkualitas tinggi (ala Gamma.app) secara otomatis dari prompt topik. Aplikasi ini terhubung ke model AI (Gemini 3.8 Flash High) melalui gateway `9router` via Cloudflare Tunnel yang berjalan di NAT VPS (RAM 2GB).

### 2. Constraints & Infrastructure
- **Server Environment**: NAT VPS (RAM 2GB, ~1.3GB free).
- **Process Memory Limit**: < 120MB RSS.
- **Zero Headless Browsers**: Tidak ada Puppeteer / Playwright / Chromium untuk mencegah Out-Of-Memory (OOM).
- **Export Engine**: Pure JavaScript `pptxgenjs` untuk menghasilkan file `.pptx` asli yang dapat diedit di Microsoft PowerPoint dan Google Slides.

### 3. User Journey & Business Process
1. **Input Phase**: User mengetik topik presentasi, memilih jumlah slide (default 6), dan memilih tema visual (`dark_modern`, `cyberpunk`, `corporate_blue`, `minimal_light`).
2. **Generation Phase**:
   - Backend memanggil `9router` dengan system prompt anti-slop.
   - AI menghasilkan data JSON terstruktur sesuai skema presentasi.
   - Backend memvalidasi JSON menggunakan `zod` dan fungsi sanitasi otomatis.
3. **Interactive Preview Phase**:
   - Web frontend menampilkan preview deck interaktif bergaya modern fluid cards.
   - User dapat berpindah slide (Next / Previous / Keyboard arrow) atau mengganti tema tampilan.
4. **Export Phase**:
   - User mengklik tombol "Download .PPTX".
   - Backend/Client merender data ke binary PPTX menggunakan `pptxgenjs` dengan koordinat 16:9 yang rapi.
   - File `.pptx` terunduh ke perangkat pengguna.

### 4. Layout Specifications
- **Hero**: Slide pembuka berimpact tinggi dengan badge kategori.
- **Cards**: Grid 2-3 kolom untuk pilar atau fitur.
- **Stats**: 2-3 kartu metrik besar dengan persentase/angka tebal.
- **Timeline**: 3-4 langkah alur atau roadmap bertahap.
- **Callout**: Kutipan atau kesimpulan penting dengan border aksen.

### 5. Tech Stack
- **Backend**: Node.js + Express (TypeScript), Zod, PptxGenJS, Dotenv, Cors.
- **Frontend**: Vite + React + Tailwind CSS + Lucide React.
- **AI Gateway**: 9router (OpenAI-compatible) via Cloudflare Tunnel (`ag/gemini-3.8-flash-high`).
