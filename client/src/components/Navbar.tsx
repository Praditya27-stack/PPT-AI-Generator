import React from 'react';
import type { PresentationTheme } from '../types/presentation';
import { Download, Plus, Sliders, Edit3, Eye, Presentation } from 'lucide-react';

interface NavbarProps {
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
  onNewPresentation,
  onExportPPTX,
  isExporting,
  currentTheme,
  onThemeChange,
  hasDeck,
  isEditingMode,
  onToggleEditingMode
}) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.75rem 1.75rem'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              backgroundColor: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <Presentation size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  fontFamily: 'Outfit, sans-serif',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em'
                }}
              >
                Deck Studio
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Gemini 3.8 Flash • NAT VPS 9router • Anti-Slop
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* View Mode Segmented Controls */}
          {hasDeck && (
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '2px'
              }}
            >
              <button
                type="button"
                onClick={() => isEditingMode && onToggleEditingMode()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: !isEditingMode ? 'var(--accent)' : 'transparent',
                  color: !isEditingMode ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'background-color 0.15s ease'
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
                  padding: '5px 12px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: isEditingMode ? 'var(--accent)' : 'transparent',
                  color: isEditingMode ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <Edit3 size={14} />
                <span>Kustomisasi</span>
              </button>
            </div>
          )}

          {/* Theme Dropdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '6px',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem'
            }}
          >
            <Sliders size={13} style={{ color: 'var(--text-muted)' }} />
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
                cursor: 'pointer'
              }}
            >
              <option value="dark_modern" style={{ background: '#14171F' }}>Dark Slate</option>
              <option value="cyberpunk" style={{ background: '#12141A' }}>Matte Emerald</option>
              <option value="corporate_blue" style={{ background: '#0F172A' }}>Corporate Navy</option>
              <option value="minimal_light" style={{ background: '#FFFFFF', color: '#0F172A' }}>Studio Light</option>
            </select>
          </div>

          {/* New Presentation */}
          <button className="btn-secondary" onClick={onNewPresentation}>
            <Plus size={14} />
            <span>Topik Baru</span>
          </button>

          {/* Export PPTX */}
          {hasDeck && (
            <button
              className="btn-primary"
              onClick={onExportPPTX}
              disabled={isExporting}
            >
              <Download size={14} />
              <span>{isExporting ? 'Mengekspor...' : 'Unduh .PPTX'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
