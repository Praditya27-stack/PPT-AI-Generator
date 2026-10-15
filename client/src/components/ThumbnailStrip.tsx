import React from 'react';
import type { Slide } from '../types/presentation';

interface ThumbnailStripProps {
  slides: Slide[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
}

export const ThumbnailStrip: React.FC<ThumbnailStripProps> = ({
  slides,
  currentIndex,
  onSelectSlide
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '0.5rem 1rem',
        overflowX: 'auto',
        maxWidth: '100%',
        scrollbarWidth: 'none'
      }}
    >
      {slides.map((s, idx) => {
        const isActive = idx === currentIndex;
        return (
          <button
            key={s.id}
            onClick={() => onSelectSlide(idx)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '4px',
              padding: '8px 12px',
              borderRadius: '10px',
              backgroundColor: isActive ? 'var(--bg-surface-elevated)' : 'rgba(255, 255, 255, 0.025)',
              border: isActive ? '1.5px solid var(--accent)' : '1px solid var(--border-subtle)',
              boxShadow: isActive ? '0 4px 14px -2px rgba(139, 92, 246, 0.35)' : 'none',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              minWidth: '105px',
              maxWidth: '140px',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--accent-text)' : 'var(--text-muted)'
                }}
              >
                Card {s.slideNumber}
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em'
                }}
              >
                {s.layout}
              </span>
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.74rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}
            >
              {s.title || 'Tanpa Judul'}
            </div>
          </button>
        );
      })}
    </div>
  );
};
