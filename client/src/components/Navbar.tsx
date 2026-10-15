import React, { useState } from 'react';
import type { PresentationTheme } from '../types/presentation';
import { Download, Sparkles, Palette, Edit3, Eye, Check, Edit2 } from 'lucide-react';

interface NavbarProps {
  deckTitle: string;
  onUpdateDeckTitle?: (title: string) => void;
  onNewPresentation: () => void;
  onExportPPTX: () => void;
  isExporting: boolean;
  currentTheme: PresentationTheme;
  onThemeChange: (theme: PresentationTheme) => void;
  hasDeck: boolean;
  isEditingMode: boolean;
  onToggleEditingMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  deckTitle,
  onUpdateDeckTitle,
  onNewPresentation,
  onExportPPTX,
  isExporting,
  currentTheme,
  onThemeChange,
  hasDeck,
  isEditingMode,
  onToggleEditingMode
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(deckTitle);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (tempTitle.trim() && onUpdateDeckTitle) {
      onUpdateDeckTitle(tempTitle.trim());
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(18, 21, 32, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.65rem 1.5rem',
        transition: 'all 0.2s ease'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Brand & Document Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '280px' }}>
          {/* Gamma-styled Logo Mark */}
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent) 0%, #6366F1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px -2px rgba(139, 92, 246, 0.5)',
              flexShrink: 0
            }}
          >
            <Sparkles size={18} />
          </div>

          {/* Title & Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '420px' }}>
            {isEditingTitle ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="text"
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
                  autoFocus
                  style={{
                    padding: '2px 8px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--accent)',
                    borderRadius: '4px',
                    outline: 'none',
                    width: '320px'
                  }}
                />
                <button
                  onClick={handleTitleSubmit}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-text)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  setTempTitle(deckTitle);
                  setIsEditingTitle(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '4px'
                }}
                title="Klik untuk mengubah judul presentasi"
              >
                <span
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '340px'
                  }}
                >
                  {deckTitle || 'Presentasi Tanpa Judul'}
                </span>
                <Edit2 size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  display: 'inline-block'
                }}
              />
              <span>Tersimpan</span>
              <span>•</span>
              <span>Gemini 3.8 Flash High</span>
            </div>
          </div>
        </div>

        {/* Center Mode Switcher: Tayang vs Kustomisasi */}
        {hasDeck && (
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: 'var(--bg-surface-sunken)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9999px',
              padding: '3px',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)'
            }}
          >
            <button
              type="button"
              onClick={() => isEditingMode && onToggleEditingMode()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                backgroundColor: !isEditingMode ? 'var(--accent)' : 'transparent',
                color: !isEditingMode ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: !isEditingMode ? '0 2px 8px -1px rgba(139, 92, 246, 0.5)' : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <Eye size={14} />
              <span>Tayang</span>
            </button>
            <button
              type="button"
              onClick={() => !isEditingMode && onToggleEditingMode()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 16px',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                backgroundColor: isEditingMode ? 'var(--accent)' : 'transparent',
                color: isEditingMode ? '#FFFFFF' : 'var(--text-secondary)',
                boxShadow: isEditingMode ? '0 2px 8px -1px rgba(139, 92, 246, 0.5)' : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              <Edit3 size={14} />
              <span>Kustomisasi</span>
            </button>
          </div>
        )}

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Gamma Theme Picker */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem'
            }}
          >
            <Palette size={14} style={{ color: 'var(--accent-text)' }} />
            <select
              value={currentTheme}
              onChange={(e) => onThemeChange(e.target.value as PresentationTheme)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
                padding: '0 4px'
              }}
            >
              <option value="dark_modern" style={{ background: '#121520', color: '#FFFFFF' }}>Obsidian Violet</option>
              <option value="cyberpunk" style={{ background: '#0E1317', color: '#F4F4F5' }}>Cyber Emerald</option>
              <option value="corporate_blue" style={{ background: '#0E1626', color: '#F8FAFC' }}>Corporate Ocean</option>
              <option value="minimal_light" style={{ background: '#FFFFFF', color: '#11141A' }}>Editorial Light</option>
            </select>
          </div>

          {/* New Presentation with AI */}
          <button
            className="btn-primary"
            onClick={onNewPresentation}
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #6366F1 100%)',
              border: 'none'
            }}
          >
            <Sparkles size={14} />
            <span>Buat dengan AI</span>
          </button>

          {/* Export PPTX */}
          {hasDeck && (
            <button
              className="btn-secondary"
              onClick={onExportPPTX}
              disabled={isExporting}
              title="Unduh presentasi sebagai file PowerPoint asli (.pptx) dengan presenter notes"
            >
              <Download size={14} />
              <span>{isExporting ? 'Mengekspor...' : 'Ekspor PPTX'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

