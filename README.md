# 🚀 PPT-AI-Generator (Gamma AI Clone)

> **High-Impact AI Slide Deck & Presentation Generator** powered by **Gemini 3.8 Flash** via **9router Gateway** and Cloudflare Tunnel.

---

## ⚡ Highlights

- **Anti-AI-Slop Storytelling Engine**: Enforces Minto Pyramid / SCQA frameworks, producing punchy headlines (<8 words), structured feature cards, quantified metrics, and linear roadmaps—never walls of generic text.
- **5 Modern Visual Layouts**:
  1. `Hero`: Cover slide with category badge, grand title, and presenter note.
  2. `Cards`: 2–4 column responsive cards with semantic icons and top accent stripes.
  3. `Stats`: Giant 40pt+ metrics with impact labels and context.
  4. `Timeline`: Process roadmap with circular nodes and connecting track.
  5. `Callout`: Highlight quote with thesis badge and left accent bar.
- **Zero-OOM PPTX Engine (`pptxgenjs`)**:
  - Dilarang keras menggunakan headless browser (Puppeteer / Playwright / Chromium) untuk mencegah Out-Of-Memory (OOM) pada VPS RAM 2GB.
  - Menghasilkan file `.pptx` asli (bukan konversi HTML) dengan koordinat 16:9 widescreen (`10.0" x 5.625"`).
  - Memory footprint ultra-rendah (< 20MB RAM saat ekspor).
- **Curated Multi-Theme System**:
  - `Dark Modern`: Deep Slate `#0F172A` & Cyan `#06B6D4`
  - `Cyberpunk Neon`: Obsidian `#09090B` & Emerald `#10B981`
  - `Corporate Royal`: Navy `#0A192F` & Royal Blue `#2563EB`
  - `Minimal Light`: Pure Slate `#F8FAFC` & Orange `#EA580C`
- **Interactive Web Deck Presenter**:
  - Fluid keyboard navigation (Arrow Left / Right / Space).
  - Thumbnail jump strip.
  - Real-time theme switcher.
  - Direct 1-click `.pptx` download.

---

## 🏗️ System Architecture

```
[ User Input (Topic & Theme) ]
              │
              ▼
  [ Express Backend Server ]
              │ (HTTP POST with stream: false)
              ▼
[ Cloudflare Tunnel / 9router ] ──► [ Gemini 3.8 Flash High ]
              │
              ▼ (Strict JSON Schema)
[ Zod Validation & JSON Sanitizer ]
              │
       ┌──────┴──────────────────────────┐
       ▼                                 ▼
[ React Interactive Web Deck ]    [ pptxgenjs Native Exporter ]
(Fluid Card Viewer & Presenter)    (Downloadable .pptx File)
```

---

## 🚀 Getting Started

### 1. Requirements
- Node.js >= 20 (Node 24 recommended)
- npm >= 10

### 2. Environment Configuration
Buat file `.env` di root direktori (contoh ada di `.env.example`):
```env
PORT=3001
ROUTER_BASE_URL=https://understanding-clearly-intro-writer.trycloudflare.com/v1
ROUTER_API_KEY=sk-f25a73114addbd52-ev5wwm-ac9dd0f3
ROUTER_MODEL=ag/gemini-3.8-flash-high
```

### 3. Installation
```bash
# Install backend dependencies
npm install

# Install client dependencies
npm --prefix client install
```

### 4. Running the Application

#### Option A: Full Production Mode (Recommended)
```bash
# Build frontend and backend
npm run build:client
npm run build:server

# Start the unified server on http://localhost:3001
npm start
```

#### Option B: Development Mode (Hot Reload)
```bash
# Terminal 1: Backend Watcher
npm run dev:server

# Terminal 2: Vite Dev Server
npm run dev:client
```
Buka browser di `http://localhost:5173`.

---

## 🧪 Testing Integration

Untuk menguji koneksi langsung ke 9router tunnel dan verifikasi pembuatan file PPTX:
```bash
npx tsx scripts/test-deck.ts
```

---

## 📁 Project Structure

```
PPT_AI/
├── .agents/
│   └── rules/
│       ├── architecture.md       # Batasan memori 2GB RAM & aturan zero-OOM
│       └── anti-slop.md          # Standar copywriting Minto Pyramid
├── client/                       # Frontend SPA (Vite + React + Tailwind/CSS)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── PromptModal.tsx
│   │   │   ├── SlideViewer.tsx
│   │   │   └── ThumbnailStrip.tsx
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── index.css
│   └── vite.config.ts
├── src/                          # Backend Service (Node.js + Express)
│   ├── services/
│   │   ├── aiGenerator.ts        # 9router tunnel client & anti-slop prompt
│   │   ├── jsonRepair.ts         # Sanitasi JSON extractor
│   │   └── pptxExporter.ts       # Layout calculator 16:9 via pptxgenjs
│   ├── themes/
│   │   └── colorPalettes.ts      # Palet warna 4 tema
│   ├── types/
│   │   └── presentation.ts       # Zod Schema & TypeScript interfaces
│   └── server.ts                 # Express REST API
├── scripts/
│   └── test-deck.ts              # E2E test script
├── PRD.md                        # Product Requirements Document
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🛡️ VPS & Cloudflare Tunnel Notes
- Endpoint 9router dihubungkan melalui Cloudflare Tunnel yang berjalan di NAT VPS.
- Seluruh pipeline ekspor menggunakan pure JavaScript in-memory streaming, menjaga penggunaan RAM proses server stabil di kisaran **60–80 MB**, jauh di bawah batas 2GB RAM VPS.
