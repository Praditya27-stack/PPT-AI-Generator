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
        padding: '1rem',
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
              gap: '4px',
              padding: '6px 14px',
              borderRadius: '10px',
              background: isActive ? 'var(--badge-bg)' : 'rgba(255, 255, 255, 0.03)',
              border: isActive ? '1px solid var(--accent)' : '1px solid var(--border-card)',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '85px'
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>Slide {s.slideNumber}</span>
            <span
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                opacity: 0.8,
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
