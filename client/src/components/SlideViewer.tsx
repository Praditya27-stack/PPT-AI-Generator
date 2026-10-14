import React from 'react';
import type {
  Slide,
  HeroContent,
  CardsContent,
  StatsContent,
  TimelineContent,
  CalloutContent
} from '../types/presentation';
import {
  Zap,
  Shield,
  Cpu,
  Sparkles,
  Layers,
  Activity,
  BarChart3,
  TrendingUp,
  Quote,
  CheckCircle2,
  Rocket
} from 'lucide-react';

interface SlideViewerProps {
  slide: Slide;
  deckTitle: string;
}

// Icon helper
const getIcon = (iconName?: string) => {
  const name = (iconName || '').toLowerCase();
  if (name.includes('shield') || name.includes('sec')) return <Shield size={24} />;
  if (name.includes('cpu') || name.includes('ai') || name.includes('tech')) return <Cpu size={24} />;
  if (name.includes('bar') || name.includes('chart') || name.includes('data')) return <BarChart3 size={24} />;
  if (name.includes('trend') || name.includes('grow')) return <TrendingUp size={24} />;
  if (name.includes('rocket') || name.includes('launch')) return <Rocket size={24} />;
  if (name.includes('layer')) return <Layers size={24} />;
  if (name.includes('activity')) return <Activity size={24} />;
  if (name.includes('check')) return <CheckCircle2 size={24} />;
  return <Sparkles size={24} />;
};

export const SlideViewer: React.FC<SlideViewerProps> = ({ slide, deckTitle }) => {
  return (
    <div className="slide-stage-container animate-slide" key={slide.id}>
      {/* Slide Header (for non-hero slides) */}
      {slide.layout !== 'hero' && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                border: '1px solid var(--accent)'
              }}
            >
              {slide.layout}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              • {slide.slideNumber}
            </span>
          </div>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '6px'
            }}
          >
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '85%' }}>
              {slide.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Slide Layout Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {slide.layout === 'hero' && <HeroLayout content={slide.content as HeroContent} title={slide.title} />}
        {slide.layout === 'cards' && <CardsLayout content={slide.content as CardsContent} />}
        {slide.layout === 'stats' && <StatsLayout content={slide.content as StatsContent} />}
        {slide.layout === 'timeline' && <TimelineLayout content={slide.content as TimelineContent} />}
        {slide.layout === 'callout' && <CalloutLayout content={slide.content as CalloutContent} />}
      </div>

      {/* Slide Footer */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}
      >
        <span>{deckTitle}</span>
        <span style={{ fontWeight: 600 }}>{slide.slideNumber}</span>
      </div>
    </div>
  );
};

// 1. Hero Layout
const HeroLayout: React.FC<{ content: HeroContent; title: string }> = ({ content, title }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
        padding: '1rem 0'
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '20px',
          background: 'var(--badge-bg)',
          color: 'var(--badge-text)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          border: '1px solid var(--accent)'
        }}
      >
        <Zap size={14} />
        {content.badge || 'EXECUTIVE BRIEFING'}
      </div>

      <h1
        style={{
          fontSize: '3.2rem',
          fontWeight: 900,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: '1.25rem',
          maxWidth: '90%'
        }}
      >
        {content.headline || title}
      </h1>

      <p
        style={{
          fontSize: '1.35rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          maxWidth: '80%',
          marginBottom: '2rem'
        }}
      >
        {content.subheadline}
      </p>

      {content.author && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.95rem',
            color: 'var(--accent)',
            fontWeight: 600
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
          {content.author}
        </div>
      )}
    </div>
  );
};

// 2. Cards Layout
const CardsLayout: React.FC<{ content: CardsContent }> = ({ content }) => {
  const cards = content.cards || [];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cards.length <= 2 ? 2 : cards.length === 3 ? 3 : 4}, 1fr)`,
        gap: '1.5rem',
        width: '100%'
      }}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-card)',
            borderRadius: '16px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '60px',
              height: '3px',
              background: 'var(--accent)',
              borderRadius: '0 0 4px 0'
            }}
          />

          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: 'var(--badge-bg)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}
          >
            {getIcon(card.iconName)}
          </div>

          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem'
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginTop: 'auto'
            }}
          >
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

// 3. Stats Layout
const StatsLayout: React.FC<{ content: StatsContent }> = ({ content }) => {
  const stats = content.stats || [];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length <= 2 ? 2 : stats.length === 3 ? 3 : 4}, 1fr)`,
        gap: '1.5rem',
        width: '100%'
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-card)',
            borderRadius: '16px',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              fontFamily: 'Outfit, sans-serif',
              color: 'var(--accent)',
              lineHeight: 1,
              marginBottom: '0.75rem'
            }}
          >
            {stat.value}
          </div>

          <div
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}
          >
            {stat.label}
          </div>

          <div
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
              maxWidth: '85%'
            }}
          >
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. Timeline Layout
const TimelineLayout: React.FC<{ content: TimelineContent }> = ({ content }) => {
  const steps = content.steps || [];
  return (
    <div style={{ position: 'relative', width: '100%', padding: '1rem 0' }}>
      {/* Horizontal connector line */}
      <div
        style={{
          position: 'absolute',
          top: '35px',
          left: '40px',
          right: '40px',
          height: '2px',
          background: 'var(--border-card)',
          zIndex: 0
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          gap: '1.25rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        {steps.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Step Node */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--accent)',
                color: '#050810',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.95rem',
                fontFamily: 'Outfit, sans-serif',
                boxShadow: '0 0 15px var(--accent-glow)',
                marginBottom: '1.25rem'
              }}
            >
              {item.step}
            </div>

            {/* Card Content */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-card)',
                borderRadius: '12px',
                padding: '1.25rem 1rem',
                width: '100%',
                textAlign: 'center'
              }}
            >
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.4rem'
                }}
              >
                {item.title}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Callout Layout
const CalloutLayout: React.FC<{ content: CalloutContent }> = ({ content }) => {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-card)',
        borderLeft: '5px solid var(--accent)',
        borderRadius: '16px',
        padding: '2.5rem',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '4px 10px',
            borderRadius: '6px',
            background: 'var(--badge-bg)',
            color: 'var(--badge-text)'
          }}
        >
          {content.highlightBadge || 'KEY TAKEAWAY'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <Quote size={40} style={{ color: 'var(--accent)', flexShrink: 0, opacity: 0.8 }} />
        <div>
          <blockquote
            style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              marginBottom: '1rem'
            }}
          >
            "{content.quoteText}"
          </blockquote>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {content.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
