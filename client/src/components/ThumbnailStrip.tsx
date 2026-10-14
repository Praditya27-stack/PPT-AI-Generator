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
        gap: '8px',
        padding: '0.75rem',
        overflowX: 'auto',
        maxWidth: '100%'
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
              alignItems: 'center',
              gap: '2px',
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: isActive ? 'var(--accent-surface)' : 'var(--bg-surface)',
              border: isActive ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
              color: isActive ? 'var(--accent-text)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              minWidth: '80px'
            }}
          >
            <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>Slide {s.slideNumber}</span>
            <span
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em'
              }}
            >
              {s.layout}
            </span>
          </button>
        );
      })}
    </div>
  );
};
