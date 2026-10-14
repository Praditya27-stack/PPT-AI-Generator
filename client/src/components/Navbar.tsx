import React from 'react';
import type { PresentationTheme } from '../types/presentation';
import { Download, Plus, Server, Sparkles, Sliders } from 'lucide-react';

interface NavbarProps {
  onNewPresentation: () => void;
  onExportPPTX: () => void;
  isExporting: boolean;
  currentTheme: PresentationTheme;
  onThemeChange: (theme: PresentationTheme) => void;
  hasDeck: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewPresentation,
  onExportPPTX,
  isExporting,
  currentTheme,
  onThemeChange,
  hasDeck
}) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-card)',
        padding: '0.85rem 2rem'
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#050810',
              boxShadow: '0 0 15px var(--accent-glow)'
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  fontFamily: 'Outfit, sans-serif',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em'
                }}
              >
                DeckAI
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'var(--badge-bg)',
                  color: 'var(--badge-text)',
                  border: '1px solid var(--accent)'
                }}
              >
                GAMMA V2
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                color: 'var(--text-muted)'
              }}
            >
              <Server size={11} style={{ color: '#10B981' }} />
              <span>NAT VPS 9router • Gemini 3.8 Flash • RAM &lt;60MB</span>
            </div>
          </div>
        </div>

        {/* Right Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-card)',
              fontSize: '0.85rem'
            }}
          >
            <Sliders size={14} style={{ color: 'var(--accent)' }} />
            <select
              value={currentTheme}
              onChange={(e) => onThemeChange(e.target.value as PresentationTheme)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="dark_modern" style={{ background: '#0F172A' }}>Dark Modern</option>
              <option value="cyberpunk" style={{ background: '#09090B' }}>Cyberpunk Neon</option>
              <option value="corporate_blue" style={{ background: '#0A192F' }}>Corporate Royal</option>
              <option value="minimal_light" style={{ background: '#F8FAFC', color: '#0F172A' }}>Minimal Light</option>
            </select>
          </div>

          {/* New Deck Button */}
          <button className="btn-secondary" onClick={onNewPresentation}>
            <Plus size={16} />
            <span>Topik Baru</span>
          </button>

          {/* Export PPTX Button */}
          {hasDeck && (
            <button
              className="btn-primary"
              onClick={onExportPPTX}
              disabled={isExporting}
              style={{ minWidth: '150px', justifyContent: 'center' }}
            >
              <Download size={16} />
              <span>{isExporting ? 'Exporting...' : 'Unduh .PPTX'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
