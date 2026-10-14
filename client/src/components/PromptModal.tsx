import React, { useState } from 'react';
import type { PresentationTheme } from '../types/presentation';
import { Sparkles, Sliders, Globe, Layers, X, ArrowRight } from 'lucide-react';

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
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '650px',
          padding: '2.5rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div
            style={{
              padding: '6px',
              borderRadius: '8px',
              background: 'var(--badge-bg)',
              color: 'var(--accent)'
            }}
          >
            <Sparkles size={20} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Buat Presentasi AI
          </h2>
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
          Bertenaga Gemini 3.8 Flash via 9router. Menghasilkan presentasi berstruktur tajam bebas AI slop.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Topic Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}
            >
              Topik atau Ide Presentasi
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Strategi Implementasi Otomasi AI untuk Mengurangi Beban Operasional Perusahaan..."
              rows={3}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                fontFamily: 'Inter, sans-serif',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-card)')}
            />

            {/* Quick Templates */}
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {TEMPLATES.map((tpl, i) => (
                <button
                  type="button"
                  key={i}
                  disabled={isLoading}
                  onClick={() => setTopic(tpl)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  + {tpl.slice(0, 32)}...
                </button>
              ))}
            </div>
          </div>

          {/* Grid Settings: Slide Count, Theme, Language */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            {/* Slide Count */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '6px'
                }}
              >
                <Layers size={14} /> Jumlah Slide
              </label>
              <select
                value={slideCount}
                onChange={(e) => setSlideCount(Number(e.target.value))}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value={4} style={{ background: '#0F172A' }}>4 Slide (Ringkas)</option>
                <option value={5} style={{ background: '#0F172A' }}>5 Slide</option>
                <option value={6} style={{ background: '#0F172A' }}>6 Slide (Standar)</option>
                <option value={8} style={{ background: '#0F172A' }}>8 Slide (Mendalam)</option>
                <option value={10} style={{ background: '#0F172A' }}>10 Slide (Lengkap)</option>
              </select>
            </div>

            {/* Visual Theme */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '6px'
                }}
              >
                <Sliders size={14} /> Tema Visual
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as PresentationTheme)}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="dark_modern" style={{ background: '#0F172A' }}>Dark Modern (Cyan)</option>
                <option value="cyberpunk" style={{ background: '#09090B' }}>Cyberpunk (Emerald)</option>
                <option value="corporate_blue" style={{ background: '#0A192F' }}>Corporate (Royal)</option>
                <option value="minimal_light" style={{ background: '#F8FAFC', color: '#000' }}>Minimal Light</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '6px'
                }}
              >
                <Globe size={14} /> Bahasa
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'id' | 'en')}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="id" style={{ background: '#0F172A' }}>Indonesia</option>
                <option value="en" style={{ background: '#0F172A' }}>English</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
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
              style={{ minWidth: '170px', justifyContent: 'center' }}
            >
              {isLoading ? (
                <span>Menghasilkan Slide...</span>
              ) : (
                <>
                  <span>Generate Deck</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
