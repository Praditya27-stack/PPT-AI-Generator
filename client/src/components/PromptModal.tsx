import React, { useState } from 'react';
import type { PresentationTheme } from '../types/presentation';
import { Layers, Palette, Globe, X, ArrowRight, Sparkles } from 'lucide-react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (params: { topic: string; slideCount: number; theme: PresentationTheme; language: 'id' | 'en' }) => void;
  isLoading: boolean;
}

const TEMPLATES = [
  'Kecerdasan Buatan untuk Transformasi Bisnis Enterprise 2026',
  'Zero-Trust Cloud Architecture untuk Keamanan Skala Global',
  'Pitch Deck B2B AI SaaS: Skalabilitas Profit & Akuisisi Pasar',
  'Strategi Manajemen Keuangan Otomatis Berbasis Machine Learning'
];

export const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  isLoading
}) => {
  const [topic, setTopic] = useState('');
  const [slideCount, setSlideCount] = useState(6);
  const [theme, setTheme] = useState<PresentationTheme>('dark_modern');
  const [language, setLanguage] = useState<'id' | 'en'>('id');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;
    onGenerate({ topic: topic.trim(), slideCount, theme, language });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 10, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          padding: '2.25rem',
          position: 'relative',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={18} />
        </button>

        {/* Eyebrow & Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: 'var(--accent-surface)',
              color: 'var(--accent-text)'
            }}
          >
            <Sparkles size={11} />
            AI Deck Generator
          </span>
        </div>

        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.6rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '4px'
          }}
        >
          Buat Presentasi dengan AI
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: '1.5rem'
          }}
        >
          Didukung model Gemini 3.8 Flash High dengan arsitektur anti-slop: berbasis data empiris, ringkas, dan terstruktur.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Topic Input */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '6px'
              }}
            >
              Topik atau Premis Utama
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Strategi Efisiensi Infrastruktur Cloud untuk Mengurangi Biaya Operasional..."
              rows={3}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                fontSize: '0.95rem',
                resize: 'none',
                marginBottom: '6px'
              }}
            />

            {/* Quick Templates */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {TEMPLATES.map((tpl, i) => (
                <button
                  type="button"
                  key={i}
                  disabled={isLoading}
                  onClick={() => setTopic(tpl)}
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {tpl.slice(0, 32)}...
                </button>
              ))}
            </div>
          </div>

          {/* Grid Settings: Slide Count, Theme, Language */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.85rem',
              marginBottom: '1.75rem'
            }}
          >
            {/* Slide Count */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '5px'
                }}
              >
                <Layers size={13} /> Jumlah Slide
              </label>
              <select
                value={slideCount}
                onChange={(e) => setSlideCount(Number(e.target.value))}
                disabled={isLoading}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <option value={4}>4 Slide</option>
                <option value={5}>5 Slide</option>
                <option value={6}>6 Slide (Standar)</option>
                <option value={8}>8 Slide</option>
                <option value={10}>10 Slide</option>
              </select>
            </div>

            {/* Visual Theme */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '5px'
                }}
              >
                <Palette size={13} /> Tema Visual
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as PresentationTheme)}
                disabled={isLoading}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <option value="dark_modern">Obsidian Violet</option>
                <option value="cyberpunk">Cyber Emerald</option>
                <option value="corporate_blue">Corporate Ocean</option>
                <option value="minimal_light">Editorial Light</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '5px'
                }}
              >
                <Globe size={13} /> Bahasa
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'id' | 'en')}
                disabled={isLoading}
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          {/* Submit Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading || !topic.trim()}
              style={{
                minWidth: '160px',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--accent) 0%, #6366F1 100%)',
                boxShadow: '0 4px 14px -2px rgba(139, 92, 246, 0.45)'
              }}
            >
              {isLoading ? (
                <span>Menghasilkan...</span>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Generate Slide</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
