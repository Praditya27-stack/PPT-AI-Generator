import { useState, useEffect, useCallback } from 'react';
import type { PresentationDeck, PresentationTheme } from './types/presentation';
import { Navbar } from './components/Navbar';
import { SlideViewer } from './components/SlideViewer';
import { ThumbnailStrip } from './components/ThumbnailStrip';
import { PromptModal } from './components/PromptModal';
import {
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Maximize2
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
      title: 'AI Mendorong Nilai Tambah Ekonomi Nasional 2026',
      subtitle: 'Transformasi dari eksperimen parsial menuju integrasi ekosistem AI enterprise berskala penuh.',
      content: {
        headline: 'Akselerasi Pertumbuhan Eksponensial Lewat Automasi Kognitif',
        subheadline: 'Mengubah struktur biaya operasional dan mempercepat time-to-market secara fundamental.',
        badge: 'STRATEGIC BRIEFING 2026',
        author: 'Disiapkan oleh AI Systems Architect'
      }
    },
    {
      id: 'slide-2',
      slideNumber: 2,
      layout: 'cards',
      title: 'Tiga Pilar Utama Integrasi AI Terarah',
      subtitle: 'Fondasi arsitektural untuk memastikan return on investment yang nyata',
      content: {
        cards: [
          {
            title: 'Automasi Proses Kritis',
            description: 'Memangkas siklus kerja repetitif hingga 70% dengan zero manual error.',
            iconName: 'zap'
          },
          {
            title: 'Intelligence Gateway',
            description: 'Menghubungkan LLM lokal dengan database enterprise secara aman dan privat.',
            iconName: 'cpu'
          },
          {
            title: 'Tata Kelola & Keamanan',
            description: 'Perlindungan data sensitif sesuai regulasi privasi dengan enkripsi end-to-end.',
            iconName: 'shield'
          }
        ]
      }
    },
    {
      id: 'slide-3',
      slideNumber: 3,
      layout: 'stats',
      title: 'Metrik Efisiensi & Dampak Finansial Terukur',
      subtitle: 'Kompilasi tolok ukur implementasi arsitektur AI modern',
      content: {
        stats: [
          {
            value: '4.8x',
            label: 'Percepatan Operasional',
            description: 'Waktu siklus deployment dan analisis data'
          },
          {
            value: '62%',
            label: 'Reduksi Beban Biaya',
            description: 'Penghematan biaya operasional backend tahunan'
          },
          {
            value: '<120MB',
            label: 'Alokasi Memori Server',
            description: 'Arsitektur ultra-ringan anti-OOM pada NAT VPS'
          }
        ]
      }
    },
    {
      id: 'slide-4',
      slideNumber: 4,
      layout: 'timeline',
      title: 'Roadmap Eksekusi Multi-Tahap Menuju Skalabilitas',
      subtitle: 'Tahapan sistematis migrasi proses konvensional ke platform AI',
      content: {
        steps: [
          { step: '01', title: 'Audit & Arsitektur', description: 'Identifikasi bottleneck dan kalkulasi kapasitas RAM/GPU.' },
          { step: '02', title: 'Pilot Gateway', description: 'Integrasi tunnel 9router dan validasi skema runtime.' },
          { step: '03', title: 'Rollout Produksi', description: 'Distribusi pipeline generator presentasi ke end-user.' }
        ]
      }
    },
    {
      id: 'slide-5',
      slideNumber: 5,
      layout: 'callout',
      title: 'Urgensi Kepemimpinan di Lanskap AI 2026',
      subtitle: 'Konklusi strategis bagi para pembuat keputusan',
      content: {
        quoteText: 'Organisasi yang membangun arsitektur data adaptif hari ini akan menguasai margin pasar besok.',
        highlightBadge: 'KESIMPULAN EKSEKUTIF',
        explanation: 'Kecepatan adopsi yang terukur menentukan kelangsungan kompetitif perusahaan di era komputasi otonom.'
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
        onNewPresentation={() => setIsModalOpen(true)}
        onExportPPTX={handleExportPPTX}
        isExporting={isExporting}
        currentTheme={deck.theme}
        onThemeChange={handleThemeChange}
        hasDeck={!!deck}
      />

      {/* Main Slide Presentation Stage */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Error notification banner */}
        {errorMessage && (
          <div
            style={{
              width: '100%',
              maxWidth: '900px',
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

        {/* Slide Stage Wrapper with Prev/Next Controls */}
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            position: 'relative'
          }}
        >
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="btn-secondary"
            title="Slide Sebelumnya (Arrow Left)"
            style={{
              width: '48px',
              height: '48px',
              padding: 0,
              borderRadius: '50%',
              justifyContent: 'center',
              opacity: currentSlideIndex === 0 ? 0.3 : 1,
              cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Active Slide Viewer */}
          {currentSlide && (
            <SlideViewer slide={currentSlide} deckTitle={deck.title} />
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentSlideIndex === deck.slides.length - 1}
            className="btn-secondary"
            title="Slide Selanjutnya (Arrow Right / Space)"
            style={{
              width: '48px',
              height: '48px',
              padding: 0,
              borderRadius: '50%',
              justifyContent: 'center',
              opacity: currentSlideIndex === deck.slides.length - 1 ? 0.3 : 1,
              cursor: currentSlideIndex === deck.slides.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div style={{ width: '100%', maxWidth: '900px', marginTop: '1.5rem' }}>
          <ThumbnailStrip
            slides={deck.slides}
            currentIndex={currentSlideIndex}
            onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
          />
        </div>

        {/* Deck Bottom Meta Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '0.75rem',
            color: 'var(--text-muted)',
            fontSize: '0.85rem'
          }}
        >
          <span>Gunakan tombol panah ⬅️ ➡️ keyboard untuk navigasi</span>
          <span>•</span>
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else {
                document.exitFullscreen().catch(() => {});
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Maximize2 size={13} /> Fullscreen
          </button>
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
