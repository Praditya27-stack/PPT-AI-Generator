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
  Edit3
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
      eyebrow: 'PRESENTASI · STRATEGI EKSEKUTIF 2026',
      title: 'AI Mendorong Nilai Tambah Ekonomi Nasional 2026',
      subtitle: 'Transformasi dari eksperimen parsial menuju integrasi ekosistem AI enterprise berskala penuh.',
      speakerNotes: 'Sambut audiens, perkenalkan agenda transformasi enterprise AI, dan soroti fokus pada efisiensi biaya nyata.',
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
      eyebrow: '01 — PILAR ARSITEKTUR',
      title: 'Tiga Pilar Utama Integrasi AI Terarah',
      subtitle: 'Fondasi arsitektural untuk memastikan return on investment yang nyata',
      speakerNotes: 'Jelaskan mengapa ketiga pilar ini harus diimplementasikan bersamaan untuk mencegah kebocoran data dan pembengkakan biaya.',
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
      eyebrow: '02 — DAMPAK TERUKUR',
      title: 'Metrik Efisiensi & Dampak Finansial Terukur',
      subtitle: 'Kompilasi tolok ukur implementasi arsitektur AI modern',
      speakerNotes: 'Arahkan perhatian audiens ke metrik 4.8x akselerasi dan kepatuhan memori <120MB yang membuktikan efisiensi ekstrem.',
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
      eyebrow: '03 — ROADMAP IMPLEMENTASI',
      title: 'Roadmap Eksekusi Multi-Tahap Menuju Skalabilitas',
      subtitle: 'Tahapan sistematis migrasi proses konvensional ke platform AI',
      speakerNotes: 'Tekankan bahwa fase audit dan pilot hanya membutuhkan 4 minggu pertama sebelum cutover penuh.',
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
      eyebrow: 'KESIMPULAN · LANGKAH STRATEGIS',
      title: 'Urgensi Kepemimpinan di Lanskap AI 2026',
      subtitle: 'Konklusi strategis bagi para pembuat keputusan',
      speakerNotes: 'Tutup dengan ajakan bertindak jelas untuk memulai asesmen infrastruktur awal minggu ini.',
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
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
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
            maxWidth: '1280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            position: 'relative'
          }}
        >
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="btn-secondary"
            title="Slide Sebelumnya (Panah Kiri)"
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '6px',
              justifyContent: 'center',
              opacity: currentSlideIndex === 0 ? 0.3 : 1,
              cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
              flexShrink: 0
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Active Slide Stage: Editor vs Viewer */}
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
              <div style={{ position: 'relative', width: '100%', maxWidth: '1050px' }}>
                <SlideViewer slide={currentSlide} deckTitle={deck.title} />
                
                {/* Quick Edit Button */}
                <button
                  type="button"
                  onClick={() => setIsEditingMode(true)}
                  className="btn-secondary"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '5px 10px',
                    fontSize: '0.75rem',
                    backgroundColor: 'var(--bg-surface-elevated)'
                  }}
                  title="Kustomisasi teks dan layout slide ini"
                >
                  <Edit3 size={13} />
                  <span>Kustomisasi Slide</span>
                </button>
              </div>
            )
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentSlideIndex === deck.slides.length - 1}
            className="btn-secondary"
            title="Slide Selanjutnya (Panah Kanan / Space)"
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '6px',
              justifyContent: 'center',
              opacity: currentSlideIndex === deck.slides.length - 1 ? 0.3 : 1,
              cursor: currentSlideIndex === deck.slides.length - 1 ? 'not-allowed' : 'pointer',
              flexShrink: 0
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Thumbnail Navigation Strip */}
        <div style={{ width: '100%', maxWidth: '900px', marginTop: '1.25rem' }}>
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
            gap: '12px',
            marginTop: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.8rem'
          }}
        >
          <span>Navigasi: Panah Kiri / Kanan atau Spasi</span>
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
              gap: '4px',
              fontSize: '0.8rem'
            }}
          >
            <Maximize2 size={13} /> Layar Penuh
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
