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
  Shield,
  Cpu,
  BarChart3,
  TrendingUp,
  Layers,
  Activity,
  CheckCircle2,
  Quote,
  Zap,
  ArrowRight
} from 'lucide-react';

interface SlideViewerProps {
  slide: Slide;
  deckTitle: string;
}

const getSemanticIcon = (iconName?: string) => {
  const name = (iconName || '').toLowerCase();
  if (name.includes('shield') || name.includes('sec')) return <Shield size={20} />;
  if (name.includes('cpu') || name.includes('ai') || name.includes('tech')) return <Cpu size={20} />;
  if (name.includes('bar') || name.includes('chart') || name.includes('data')) return <BarChart3 size={20} />;
  if (name.includes('trend') || name.includes('grow')) return <TrendingUp size={20} />;
  if (name.includes('zap') || name.includes('speed')) return <Zap size={20} />;
  if (name.includes('layer')) return <Layers size={20} />;
  if (name.includes('activity')) return <Activity size={20} />;
  return <CheckCircle2 size={20} />;
};

export const SlideViewer: React.FC<SlideViewerProps> = ({ slide, deckTitle }) => {
  return (
    <div className="slide-stage-container" key={slide.id}>
      {/* Slide Header (for non-hero slides) */}
      {slide.layout !== 'hero' && (
        <div style={{ marginBottom: '2.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '3px 8px',
                borderRadius: '4px',
                backgroundColor: 'var(--accent-surface)',
                color: 'var(--accent-text)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {slide.layout}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Slide {slide.slideNumber}
            </span>
          </div>

          <h2
            style={{
              fontSize: '2.1rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '6px'
            }}
          >
            {slide.title}
          </h2>

          {slide.subtitle && (
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '90%' }}>
              {slide.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Slide Body */}
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
          paddingTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-subtle)',
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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '1rem 0' }}>
      {content.badge && (
        <div
          style={{
            display: 'inline-flex',
            padding: '4px 10px',
            borderRadius: '4px',
            backgroundColor: 'var(--accent-surface)',
            color: 'var(--accent-text)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            width: 'fit-content'
          }}
        >
          {content.badge}
        </div>
      )}

      <h1
        style={{
          fontSize: '3rem',
          fontWeight: 900,
          color: 'var(--text-primary)',
          lineHeight: 1.18,
          marginBottom: '1.25rem',
          maxWidth: '92%'
        }}
      >
        {content.headline || title}
      </h1>

      <p
        style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
          maxWidth: '85%',
          marginBottom: '2rem'
        }}
      >
        {content.subheadline}
      </p>

      {content.author && (
        <div
          style={{
            fontSize: '0.9rem',
            color: 'var(--accent-text)',
            fontWeight: 600
          }}
        >
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
        gap: '1.25rem',
        width: '100%'
      }}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              backgroundColor: 'var(--accent-surface)',
              color: 'var(--accent-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            {getSemanticIcon(card.iconName)}
          </div>

          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              lineHeight: 1.3
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              fontSize: '0.9rem',
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
        gap: '1.25rem',
        width: '100%'
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '1.75rem 1.25rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              color: 'var(--accent-text)',
              lineHeight: 1.1,
              marginBottom: '0.5rem'
            }}
          >
            {stat.value}
          </div>

          <div
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.35rem'
            }}
          >
            {stat.label}
          </div>

          <div
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              maxWidth: '90%'
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: '1rem',
        width: '100%'
      }}
    >
      {steps.map((item, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '6px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span
              className="font-mono"
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'var(--accent-text)',
                backgroundColor: 'var(--accent-surface)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}
            >
              {item.step}
            </span>
            {idx < steps.length - 1 && (
              <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
            )}
          </div>

          <h4
            style={{
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.4rem',
              lineHeight: 1.3
            }}
          >
            {item.title}
          </h4>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 'auto' }}>
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

// 5. Callout Layout
const CalloutLayout: React.FC<{ content: CalloutContent }> = ({ content }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-subtle)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: '6px',
        padding: '2.25rem'
      }}
    >
      {content.highlightBadge && (
        <div style={{ marginBottom: '1rem' }}>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '3px 8px',
              borderRadius: '4px',
              backgroundColor: 'var(--accent-surface)',
              color: 'var(--accent-text)'
            }}
          >
            {content.highlightBadge}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
        <Quote size={32} style={{ color: 'var(--accent)', flexShrink: 0, opacity: 0.9 }} />
        <div>
          <blockquote
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              marginBottom: '0.85rem'
            }}
          >
            "{content.quoteText}"
          </blockquote>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            {content.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
