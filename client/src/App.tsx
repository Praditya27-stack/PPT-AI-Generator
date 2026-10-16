import { useState, useEffect, useCallback } from 'react';
import type { PresentationDeck, PresentationTheme, Slide } from './types/presentation';
import { Navbar } from './components/Navbar';
import { SlideViewer } from './components/SlideViewer';
import { SlideEditor } from './components/SlideEditor';
import { ThumbnailStrip } from './components/ThumbnailStrip';
import { PromptModal } from './components/PromptModal';
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Maximize2,
  Edit3,
  MessageSquare
} from 'lucide-react';

// Default initial high-impact deck
const INITIAL_DECK: PresentationDeck = {
  title: 'Kecerdasan Buatan untuk Transformasi Bisnis Indonesia 2026',
  description: 'Cetak biru strategis implementasi AI tingkat enterprise untuk mengakselerasi profitabilitas dan keunggulan pasar nasional.',
  theme: 'dark_modern',
  slides: [
    {
      id: 'slide-1',
      slideNumber: 1,
      layout: 'hero',
      layoutVariant: 'split_showcase',
      eyebrow: 'PRESENTASI · STRATEGI EKSEKUTIF 2026',
      title: 'AI Mendorong Nilai Tambah Ekonomi Nasional 2026',
      subtitle: 'Transformasi dari eksperimen parsial menuju integrasi ekosistem AI enterprise berskala penuh.',
      speakerNotes: 'Sambut audiens, perkenalkan agenda transformasi enterprise AI, dan soroti fokus pada efisiensi biaya nyata.',
      content: {
        headline: 'Akselerasi Pertumbuhan Eksponensial Lewat Automasi Kognitif',
        subheadline: 'Mengubah struktur biaya operasional dan mempercepat time-to-market secara fundamental.',
        badge: 'STRATEGIC BRIEFING 2026',
        author: 'Disiapkan oleh AI Systems Architect',
        keyHighlights: ['ROI 4.8x Akselerasi', 'Privat Zero-Leak Data', 'Pilot 4-Minggu Teruji'],
        visualConcept: {
          badge: 'SYSTEM ARCHITECTURE',
          nodes: ['Data Enterprise', '9router Tunnel', 'Gemini Flash', 'Output PPTX'],
          metrics: [
            { label: 'Memori VPS', value: '< 120 MB RAM' },
            { label: 'Kecepatan Respon', value: 'Sub-Detik' }
          ]
        }
      }
    },
    {
      id: 'slide-2',
      slideNumber: 2,
      layout: 'cards',
      layoutVariant: 'bento_featured',
      eyebrow: '01 — PILAR ARSITEKTUR BENTO',
      title: 'Struktur Fondasi Berorientasi Performa Tinggi',
      subtitle: 'Integrasi arsitektural asimetris untuk memaksimalisir kecepatan tanpa kompromi keamanan.',
      speakerNotes: 'Soroti kartu utama Automasi Proses Kritis di sisi kiri sebagai penggerak utama efisiensi.',
      content: {
        cards: [
          {
            title: 'Automasi Proses Kritis Terpusat',
            description: 'Memangkas siklus kerja berulang hingga 70% dengan validasi data real-time bebas human error.',
            iconName: 'zap',
            badge: 'PILAR UTAMA',
            highlight: '✦ Pangkas 70% Siklus Repetitif',
            colorVariant: 'violet'
          },
          {
            title: 'Intelligence Gateway Ringan',
            description: 'Menghubungkan LLM lokal dengan basis data enterprise secara privat.',
            iconName: 'cpu',
            badge: 'MODUL 02',
            highlight: '✦ Latensi Query <12ms',
            colorVariant: 'blue'
          },
          {
            title: 'Protokol Keamanan Zero-Trust',
            description: 'Enkripsi data berlapis menjamin kepatuhan penuh regulasi privasi.',
            iconName: 'shield',
            badge: 'MODUL 03',
            highlight: '✦ Enkripsi AES-256 GCM',
            colorVariant: 'emerald'
          }
        ]
      }
    },
    {
      id: 'slide-3',
      slideNumber: 3,
      layout: 'comparison',
      layoutVariant: 'default',
      eyebrow: '02 — ANALISIS KOMPARATIF',
      title: 'Bottleneck Konvensional vs Efisiensi Platform AI',
      subtitle: 'Perbandingan langsung dampak transisi sistem terhadap produktivitas tim dan biaya operasional',
      speakerNotes: 'Tekankan perbedaan mendasar antara workflow manual yang lambat dengan pipeline otomatisasi.',
      content: {
        leftSide: {
          tag: 'METODE KONVENSIONAL',
          title: 'Alur Kerja Manual Terfragmentasi',
          points: [
            'Sinkronisasi lintas tim memakan 14+ jam kerja per minggu',
            'Tingkat kesalahan input data manual rata-rata mencapai 7.8%',
            'Ketergantungan server headless browser boros memori (1.5GB+ RAM)'
          ],
          highlight: '✕ Skalabilitas terhambat limit memori dan biaya tinggi'
        },
        rightSide: {
          tag: 'ARSITEKTUR ADAPTIF AI',
          title: 'Pemrosesan Cerdas Berbasis Stream',
          points: [
            'Automasi pembuatan dokumen selesai dalam tempo hitungan detik',
            'Validasi skema terpadu menjamin zero data drift dan konsistensi',
            'Ekspor native pure-JS pptxgenjs beroperasi pada <120MB RAM'
          ],
          highlight: '✔ Efisiensi biaya 62% dengan jaminan anti-OOM server'
        }
      }
    },
    {
      id: 'slide-4',
      slideNumber: 4,
      layout: 'stats',
      layoutVariant: 'giant_highlight',
      eyebrow: '03 — DAMPAK METRIK UTAMA',
      title: 'Peningkatan Kapabilitas Operasional Nyata',
      subtitle: 'Kuantifikasi akselerasi deliverable proyek dan konsumsi sumber daya komputasi',
      speakerNotes: 'Tunjukkan angka 4.8x sebagai pencapaian utama tim dalam kuartal terakhir.',
      content: {
        stats: [
          {
            value: '4.8x',
            label: 'Akselerasi Kecepatan Eksekusi',
            description: 'Peningkatan kecepatan delivery dari brief menjadi presentasi siap tayang.',
            category: 'METRIK PERFORMA KUNCI',
            trend: '▲ 380% vs Manual',
            progressPercent: 92
          },
          {
            value: '62%',
            label: 'Reduksi Beban OpEx',
            description: 'Penurunan belanja komputasi server tahunan.',
            category: 'PENGHEMATAN BIAYA',
            trend: '▼ 62% Terpangkas',
            progressPercent: 62
          },
          {
            value: '<120MB',
            label: 'Kepatuhan Memori Server',
            description: 'Footprint memori ultra-efisien tanpa crash.',
            category: 'INTEGRITAS SISTEM',
            trend: '✔ Zero-OOM Garansi',
            progressPercent: 98
          }
        ]
      }
    },
    {
      id: 'slide-5',
      slideNumber: 5,
      layout: 'timeline',
      layoutVariant: 'horizontal_roadmap',
      eyebrow: '04 — ROADMAP EKSEKUSI',
      title: 'Tiga Tahap Penerapan Menuju Skalabilitas Penuh',
      subtitle: 'Milestone operasional bertahap yang terukur dengan risiko terkelola',
      speakerNotes: 'Jelaskan bahwa fase audit hanya butuh 2 minggu sebelum pilot testing dimulai.',
      content: {
        steps: [
          {
            step: '01',
            title: 'Audit & Penyiapan Pipeline',
            description: 'Pemetaan proses bisnis dan kalibrasi endpoint AI.',
            status: 'SELESAI',
            deliverables: ['Audit alokasi RAM VPS budget', 'Integrasi tunnel 9router privat']
          },
          {
            step: '02',
            title: 'Pilot Deployment Terbatas',
            description: 'Uji coba live generator pada tim internal terpilih.',
            status: 'SEDANG AKTIF',
            deliverables: ['Validasi output PPTX native', 'Pengujian skema JSON dinamis']
          },
          {
            step: '03',
            title: 'Rollout Produksi Nasional',
            description: 'Deployment menyeluruh ke seluruh unit kerja.',
            status: 'TARGET Q4',
            deliverables: ['Peluncuran editor Gamma-style', 'Monitoring utilisasi 24/7']
          }
        ]
      }
    },
    {
      id: 'slide-6',
      slideNumber: 6,
      layout: 'cards',
      layoutVariant: 'grid_3',
      eyebrow: '05 — STANDAR KUALITAS KONTEN',
      title: 'Tiga Prinsip Tata Kelola Konten Anti-Slop',
      subtitle: 'Standar editorial ketat untuk menghasilkan materi berbobot eksekutif',
      speakerNotes: 'Tekankan komitmen terhadap fakta konkret dan penolakan terhadap jargon AI klise.',
      content: {
        cards: [
          {
            title: 'Bebas Jargon Klise AI',
            description: 'Menghapus kata-kata hampa seperti delve, elevate, dan revolutionary demi pesan yang presisi.',
            iconName: 'book',
            badge: 'PRINSIP 01',
            highlight: '✦ Kosakata Lugas & Faktual',
            colorVariant: 'amber'
          },
          {
            title: 'Bukti Data Sebelum Klaim',
            description: 'Setiap poin wajib didukung data metrik kuantitatif terverifikasi.',
            iconName: 'target',
            badge: 'PRINSIP 02',
            highlight: '✦ 100% Berbasis Metrik Riil',
            colorVariant: 'cyan'
          },
          {
            title: 'Desain Tipografi Berkelas',
            description: 'Struktur visual hirarkis bergaya editorial dengan kontras rasio WCAG AAA.',
            iconName: 'award',
            badge: 'PRINSIP 03',
            highlight: '✦ Font Space Grotesk & DM Sans',
            colorVariant: 'rose'
          }
        ]
      }
    },
    {
      id: 'slide-7',
      slideNumber: 7,
      layout: 'stats',
      layoutVariant: 'dashboard_3',
      eyebrow: '06 — BENCHMARK KEHANDALAN',
      title: 'Dashboard Kehandalan Layanan Real-Time',
      subtitle: 'Evaluasi berkala terhadap integritas transmisi dan kepuasan pengguna',
      speakerNotes: 'Uptime 99.98% membuktikan kehandalan infrastruktur backend express.',
      content: {
        stats: [
          {
            value: '99.98%',
            label: 'Ketersediaan Sistem SLA',
            description: 'Toleransi downtime nol pada jam kerja sibuk.',
            category: 'UPTIME SERVER',
            trend: '✔ SLA Terpenuhi',
            progressPercent: 99
          },
          {
            value: '1.2s',
            label: 'Latensi Generasi Slide',
            description: 'Respon cepat Gemini 3.8 Flash melalui router.',
            category: 'RESPON WAKTU',
            trend: '▲ 4x Lebih Cepat',
            progressPercent: 88
          },
          {
            value: '94.6%',
            label: 'Tingkat Kepuasan Pengguna',
            description: 'Rating approval dari eksekutif dan presenter.',
            category: 'USER SATISFACTION',
            trend: '▲ Rekor Tertinggi',
            progressPercent: 95
          }
        ]
      }
    },
    {
      id: 'slide-8',
      slideNumber: 8,
      layout: 'timeline',
      layoutVariant: 'vertical_steps',
      eyebrow: '07 — TAHAP PROGRESSIF BERJENJANG',
      title: 'Milestone Pencapaian Progresif Tim Operasional',
      subtitle: 'Alur eskalasi bertingkat dengan milestone deliverable jelas di tiap level',
      speakerNotes: 'Tunjukkan bagaimana setiap tahap bertingkat mengunci pencapaian sebelumnya.',
      content: {
        steps: [
          {
            step: 'L1',
            title: 'Standarisasi Fondasi',
            description: 'Penyusunan kamus token desain dan skema Zod terverifikasi.',
            status: 'TERLAKSANA',
            deliverables: ['Penyelarasan palet warna', 'Penetapan batas 2GB RAM budget']
          },
          {
            step: 'L2',
            title: 'Automasi Visual Terpadu',
            description: 'Implementasi Bento Grid, perbandingan komparatif, dan metrik raksasa.',
            status: 'SEDANG AKTIF',
            deliverables: ['Rendering 6 variasi layout dinamis', 'Ekspor PowerPoint pptxgenjs']
          },
          {
            step: 'L3',
            title: 'Ekspansi Skala Penuh',
            description: 'Kemitraan strategis dan integrasi API menyeluruh.',
            status: 'TARGET Q1 2027',
            deliverables: ['Integrasi webhook otomatis', 'Adopsi 10.000+ presentasi bulanan']
          }
        ]
      }
    },
    {
      id: 'slide-9',
      layout: 'hero',
      layoutVariant: 'centered_display',
      slideNumber: 9,
      eyebrow: '08 — VISI MASA DEPAN EKSEKUTIF',
      title: 'Membangun Kemandirian Arsitektur Komputasi Cerdas',
      subtitle: 'Mewujudkan era baru efisiensi operasional dengan teknologi yang tangkas, hemat energi, dan mandiri.',
      speakerNotes: 'Slide penutup sebelum call-to-action untuk menyatukan komitmen seluruh jajaran kepemimpinan.',
      content: {
        headline: 'Efisiensi Tanpa Batas Melalui Rekayasa Perangkat Lunak Presisi',
        subheadline: 'Menggabungkan kecerdasan model bahasa mutakhir dengan arsitektur memori rendah untuk dampak ekonomi berkelanjutan.',
        badge: 'VISI STRATEGIS 2026',
        author: 'Dewan Transformasi Digital',
        keyHighlights: ['Efisiensi Komputasi 10x', 'Zero Dependensi Vendor Berat', 'Kedaulatan Data Terjamin']
      }
    },
    {
      id: 'slide-10',
      slideNumber: 10,
      layout: 'callout',
      layoutVariant: 'key_takeaways',
      eyebrow: '09 — KESIMPULAN & LANGKAH AKSI',
      title: 'Langkah Nyata Kepemimpinan Hari Ini',
      subtitle: 'Rangkuman eksekutif dan prioritas tindakan strategis yang harus segera dijalankan',
      speakerNotes: 'Tutup presentasi dengan memberikan mandat yang jelas kepada audiens untuk mengambil tindakan.',
      content: {
        quoteText: 'Inovasi sejati bukan tentang seberapa besar model yang digunakan, melainkan seberapa presisi dampak nyata yang diciptakan.',
        highlightBadge: 'KESIMPULAN EKSEKUTIF',
        explanation: 'Eksekusi terarah hari ini mengamankan posisi pasar dan menghasilkan marjin efisiensi berlipat ganda.',
        actionItems: [
          {
            title: 'Audit Beban Infrastruktur',
            description: 'Pangkas dependensi browser berat dan terapkan pipeline dokumen berbasis stream.',
            tag: 'PRIORITAS 1'
          },
          {
            title: 'Standardisasi Konten Kualitas Tinggi',
            description: 'Gunakan panduan Anti-Slop untuk memastikan presentasi fokus pada metrik dan substansi bisnis.',
            tag: 'PRIORITAS 2'
          }
        ]
      }
    }
  ]
};

export function App() {
  const [deck, setDeck] = useState<PresentationDeck>(INITIAL_DECK);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Apply theme to document body
  useEffect(() => {
    document.body.className = `theme-${deck.theme}`;
  }, [deck.theme]);

  // Keyboard navigation
  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, deck.slides.length - 1));
  }, [deck.slides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input / textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Generate Deck via API
  const handleGenerate = async (params: {
    topic: string;
    slideCount: number;
    theme: PresentationTheme;
    language: 'id' | 'en';
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || `HTTP ${response.status}`);
      }

      const newDeck: PresentationDeck = await response.json();
      setDeck(newDeck);
      setCurrentSlideIndex(0);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Generation Error:', err);
      setErrorMessage(`Gagal generate slide: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Refine an individual slide (Shorten, Expand, Change Layout)
  const handleRefineSlide = async (
    action: 'shorten' | 'expand' | 'rewrite' | 'change_layout',
    targetLayout?: string
  ) => {
    const currentSlide = deck.slides[currentSlideIndex];
    if (!currentSlide || isRefining) return;

    setIsRefining(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/refine-slide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slide: currentSlide,
          action,
          targetLayout,
          language: 'id'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || `HTTP ${response.status}`);
      }

      const refinedSlide: Slide = await response.json();
      
      // Update deck in place
      const updatedSlides = [...deck.slides];
      updatedSlides[currentSlideIndex] = refinedSlide;
      setDeck({ ...deck, slides: updatedSlides });
    } catch (err) {
      console.error('Refine Error:', err);
      setErrorMessage(`Gagal refine slide: ${(err as Error).message}`);
    } finally {
      setIsRefining(false);
    }
  };

  // Direct edit of current slide
  const handleUpdateSlide = (updatedSlide: Slide) => {
    const updatedSlides = [...deck.slides];
    updatedSlides[currentSlideIndex] = updatedSlide;
    setDeck({ ...deck, slides: updatedSlides });
  };

  // Add Slide
  const handleAddSlide = () => {
    const newSlideNumber = currentSlideIndex + 2;
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      slideNumber: newSlideNumber,
      layout: 'cards',
      layoutVariant: 'default',
      title: 'Judul Analisis Tambahan',
      subtitle: 'Rincian aspek pendukung untuk memperkuat argumen presentasi',
      content: {
        cards: [
          { title: 'Aspek 1', description: 'Uraian mekanisme konkret dan dapat diukur.', iconName: 'zap' },
          { title: 'Aspek 2', description: 'Dampak operasional serta mitigasi risiko.', iconName: 'shield' }
        ]
      }
    };

    const updatedSlides = [...deck.slides];
    updatedSlides.splice(currentSlideIndex + 1, 0, newSlide);

    // Re-index slide numbers
    const reindexed = updatedSlides.map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    setDeck({ ...deck, slides: reindexed });
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  // Delete Slide
  const handleDeleteSlide = () => {
    if (deck.slides.length <= 1) {
      setErrorMessage('Presentasi minimal harus memiliki 1 slide.');
      return;
    }

    const updatedSlides = deck.slides.filter((_, idx) => idx !== currentSlideIndex);
    const reindexed = updatedSlides.map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    setDeck({ ...deck, slides: reindexed });
    setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
  };

  // Move Slide Order
  const handleMoveSlide = (direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? currentSlideIndex - 1 : currentSlideIndex + 1;
    if (targetIdx < 0 || targetIdx >= deck.slides.length) return;

    const updatedSlides = [...deck.slides];
    const temp = updatedSlides[currentSlideIndex];
    updatedSlides[currentSlideIndex] = updatedSlides[targetIdx];
    updatedSlides[targetIdx] = temp;

    const reindexed = updatedSlides.map((s, idx) => ({ ...s, slideNumber: idx + 1 }));
    setDeck({ ...deck, slides: reindexed });
    setCurrentSlideIndex(targetIdx);
  };

  // Export Deck to .PPTX
  const handleExportPPTX = async () => {
    if (!deck || isExporting) return;
    setIsExporting(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deck)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || `HTTP ${response.status}`);
      }

      // Convert response stream to blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const safeFilename = (deck.title || 'presentation')
        .replace(/[^a-zA-Z0-9_\-\s]/g, '')
        .trim()
        .replace(/\s+/g, '_');
      link.download = `${safeFilename}.pptx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export Error:', err);
      setErrorMessage(`Gagal ekspor ke PPTX: ${(err as Error).message}`);
    } finally {
      setIsExporting(false);
    }
  };

  // Change Theme
  const handleThemeChange = (newTheme: PresentationTheme) => {
    setDeck((prev) => ({ ...prev, theme: newTheme }));
  };

  const currentSlide = deck.slides[currentSlideIndex];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        deckTitle={deck.title}
        onUpdateDeckTitle={(title) => setDeck((prev) => ({ ...prev, title }))}
        onNewPresentation={() => setIsModalOpen(true)}
        onExportPPTX={handleExportPPTX}
        isExporting={isExporting}
        currentTheme={deck.theme}
        onThemeChange={handleThemeChange}
        hasDeck={!!deck}
        isEditingMode={isEditingMode}
        onToggleEditingMode={() => setIsEditingMode(!isEditingMode)}
      />

      {/* Main Slide Presentation Stage */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '2.5rem 1.5rem 2rem 1.5rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Error notification banner */}
        {errorMessage && (
          <div
            style={{
              width: '100%',
              maxWidth: '1060px',
              padding: '12px 18px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#FCA5A5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} />
              <span style={{ fontSize: '0.9rem' }}>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              style={{ background: 'none', border: 'none', color: '#FCA5A5', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Centered Slide Card Stage */}
        <div
          style={{
            width: '100%',
            maxWidth: '1060px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {currentSlide && (
            isEditingMode ? (
              <SlideEditor
                slide={currentSlide}
                deckTitle={deck.title}
                isRefining={isRefining}
                onUpdateSlide={handleUpdateSlide}
                onRefineSlide={handleRefineSlide}
                onAddSlide={handleAddSlide}
                onDeleteSlide={handleDeleteSlide}
                onMoveSlide={handleMoveSlide}
                canMoveUp={currentSlideIndex > 0}
                canMoveDown={currentSlideIndex < deck.slides.length - 1}
                onDoneEditing={() => setIsEditingMode(false)}
              />
            ) : (
              <div style={{ position: 'relative', width: '100%' }}>
                <SlideViewer
                  slide={currentSlide}
                  deckTitle={deck.title}
                  showSpeakerNotes={showSpeakerNotes}
                />
              </div>
            )
          )}
        </div>

        {/* Gamma Floating Glass Pill Controller */}
        <div
          style={{
            position: 'sticky',
            bottom: '1.25rem',
            zIndex: 35,
            marginTop: '1.75rem',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            pointerEvents: 'none'
          }}
        >
          <div
            className="floating-glass-bar"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              style={{
                background: 'none',
                border: 'none',
                color: currentSlideIndex === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: currentSlideIndex === 0 ? 0.35 : 1,
                transition: 'all 0.15s ease'
              }}
              title="Slide Sebelumnya (Panah Kiri)"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Slide Index Pill */}
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                padding: '3px 10px',
                borderRadius: '9999px',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                letterSpacing: '0.02em',
                userSelect: 'none'
              }}
            >
              Card {currentSlideIndex + 1} / {deck.slides.length}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === deck.slides.length - 1}
              style={{
                background: 'none',
                border: 'none',
                color: currentSlideIndex === deck.slides.length - 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                cursor: currentSlideIndex === deck.slides.length - 1 ? 'not-allowed' : 'pointer',
                padding: '6px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: currentSlideIndex === deck.slides.length - 1 ? 0.35 : 1,
                transition: 'all 0.15s ease'
              }}
              title="Slide Selanjutnya (Panah Kanan / Space)"
            >
              <ChevronRight size={18} />
            </button>

            {/* Subtle Divider */}
            <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-subtle)', margin: '0 4px' }} />

            {/* Presenter Notes Drawer Toggle */}
            <button
              type="button"
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              style={{
                background: showSpeakerNotes ? 'var(--accent-surface)' : 'transparent',
                border: showSpeakerNotes ? '1px solid var(--accent)' : '1px solid transparent',
                color: showSpeakerNotes ? 'var(--accent-text)' : 'var(--text-muted)',
                cursor: 'pointer',
                padding: '5px 9px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.78rem',
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.15s ease'
              }}
              title={showSpeakerNotes ? 'Sembunyikan Catatan Presenter' : 'Tampilkan Catatan Presenter'}
            >
              <MessageSquare size={13} />
              <span>Notes</span>
            </button>

            {/* Fullscreen Mode */}
            <button
              type="button"
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.15s ease'
              }}
              title="Layar Penuh (F11)"
            >
              <Maximize2 size={14} />
            </button>

            {/* Quick Edit Toggle */}
            <button
              type="button"
              onClick={() => setIsEditingMode(!isEditingMode)}
              style={{
                background: isEditingMode ? 'var(--accent)' : 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: isEditingMode ? '#FFFFFF' : 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '5px 10px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.78rem',
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.15s ease'
              }}
              title={isEditingMode ? 'Kembali ke Mode Tayang' : 'Edit Slide Ini'}
            >
              <Edit3 size={13} />
              <span>{isEditingMode ? 'Tayang' : 'Edit'}</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div style={{ width: '100%', maxWidth: '1060px', marginTop: '1rem' }}>
          <ThumbnailStrip
            slides={deck.slides}
            currentIndex={currentSlideIndex}
            onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
          />
        </div>
      </main>

      {/* Generator Prompt Modal */}
      <PromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
