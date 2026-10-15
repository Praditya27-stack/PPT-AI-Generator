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
  showSpeakerNotes?: boolean;
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

export const SlideViewer: React.FC<SlideViewerProps> = ({ slide, deckTitle, showSpeakerNotes = true }) => {
  return (
    <div className="slide-stage-container" key={slide.id}>
      {/* Slide Header (for non-hero slides) */}
      {slide.layout !== 'hero' && (
        <div style={{ marginBottom: '1.75rem' }}>
          {/* Eyebrow Tracker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.74rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'var(--accent-surface)',
                color: 'var(--accent-text)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {slide.eyebrow || slide.layout}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Card {slide.slideNumber}
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2.3rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.22,
              letterSpacing: '-0.035em',
              marginBottom: '6px'
            }}
          >
            {slide.title}
          </h2>

          {/* Subtitle */}
          {slide.subtitle && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                maxWidth: '90%',
                marginBottom: '8px'
              }}
            >
              {slide.subtitle}
            </p>
          )}

          {/* Gamma Signature Accent Divider (<hr color="accent">) */}
          <div
            style={{
              width: '44px',
              height: '3.5px',
              backgroundColor: 'var(--accent)',
              borderRadius: '9999px',
              marginTop: '10px'
            }}
          />
        </div>
      )}

      {/* Slide Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {slide.layout === 'hero' && <HeroLayout content={slide.content as HeroContent} title={slide.title} eyebrow={slide.eyebrow} />}
        {slide.layout === 'cards' && <CardsLayout content={slide.content as CardsContent} />}
        {slide.layout === 'stats' && <StatsLayout content={slide.content as StatsContent} />}
        {slide.layout === 'timeline' && <TimelineLayout content={slide.content as TimelineContent} />}
        {slide.layout === 'callout' && <CalloutLayout content={slide.content as CalloutContent} />}
      </div>

      {/* Presenter Cue / Speaker Notes (Gamma-style) */}
      {showSpeakerNotes && slide.speakerNotes && (
        <div
          style={{
            marginTop: '1.25rem',
            marginBottom: '0.5rem',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-surface-sunken)',
            borderLeft: '3px solid var(--accent)',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderLeftWidth: '3px',
            borderLeftColor: 'var(--accent)'
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent-text)',
              flexShrink: 0
            }}
          >
            Catatan Presenter:
          </span>
          <span style={{ lineHeight: 1.45 }}>{slide.speakerNotes}</span>
        </div>
      )}

      {/* Slide Footer */}
      <div
        style={{
          marginTop: 'auto',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}
      >
        <span style={{ fontWeight: 500 }}>{deckTitle}</span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{slide.slideNumber}</span>
      </div>
    </div>
  );
};

// 1. Hero Layout
const HeroLayout: React.FC<{ content: HeroContent; title: string; eyebrow?: string }> = ({ content, title, eyebrow }) => {
  const badgeText = eyebrow || content.badge;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', padding: '1rem 0' }}>
      {badgeText && (
        <div
          style={{
            display: 'inline-flex',
            padding: '5px 12px',
            borderRadius: '6px',
            backgroundColor: 'var(--accent-surface)',
            color: 'var(--accent-text)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            width: 'fit-content',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {badgeText}
        </div>
      )}

      <h1
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '3.1rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.16,
          letterSpacing: '-0.04em',
          marginBottom: '0.75rem',
          maxWidth: '94%'
        }}
      >
        {content.headline || title}
      </h1>

      {/* Gamma Signature Accent Divider */}
      <div
        style={{
          width: '56px',
          height: '4px',
          backgroundColor: 'var(--accent)',
          borderRadius: '9999px',
          marginBottom: '1.4rem'
        }}
      />

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '85%',
          marginBottom: '1.75rem'
        }}
      >
        {content.subheadline}
      </p>

      {content.author && (
        <div
          style={{
            fontSize: '0.9rem',
            color: 'var(--accent-text)',
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif"
          }}
        >
          {content.author}
        </div>
      )}
    </div>
  );
};

// 2. Cards Layout (Gamma Frosted Nested Cards)
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
            backgroundColor: 'rgba(255, 255, 255, 0.035)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '1.6rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.2s ease, border-color 0.2s ease'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--accent-surface)',
              color: 'var(--accent-text)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.1rem'
            }}
          >
            {getSemanticIcon(card.iconName)}
          </div>

          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.6rem',
              lineHeight: 1.3
            }}
          >
            {card.title}
          </h3>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
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

// 3. Stats Layout (Gamma Bold Metric Cards)
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
            backgroundColor: 'rgba(255, 255, 255, 0.035)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '2rem 1.4rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '3.4rem',
              fontWeight: 800,
              color: 'var(--accent)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: '0.6rem'
            }}
          >
            {stat.value}
          </div>

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.92rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              marginBottom: '0.4rem'
            }}
          >
            {stat.label}
          </div>

          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              maxWidth: '92%'
            }}
          >
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. Timeline Layout (Connected Milestones)
const TimelineLayout: React.FC<{ content: TimelineContent }> = ({ content }) => {
  const steps = content.steps || [];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: '1.1rem',
        width: '100%'
      }}
    >
      {steps.map((item, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.035)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0 8px 24px -4px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.9rem' }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'var(--accent-text)',
                backgroundColor: 'var(--accent-surface)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '3px 10px',
                borderRadius: '6px'
              }}
            >
              {item.step}
            </span>
            {idx < steps.length - 1 && (
              <ArrowRight size={15} style={{ color: 'var(--text-muted)' }} />
            )}
          </div>

          <h4
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.12rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              lineHeight: 1.3
            }}
          >
            {item.title}
          </h4>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              marginTop: 'auto'
            }}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

// 5. Callout Layout (Gamma Thesis Card)
const CalloutLayout: React.FC<{ content: CalloutContent }> = ({ content }) => {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.035)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 12px 32px -6px rgba(0, 0, 0, 0.4)'
      }}
    >
      {content.highlightBadge && (
        <div style={{ marginBottom: '1.25rem' }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: 'var(--accent-surface)',
              color: 'var(--accent-text)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {content.highlightBadge}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
        <div
          style={{
            color: 'var(--accent)',
            flexShrink: 0,
            padding: '8px',
            backgroundColor: 'var(--accent-surface)',
            borderRadius: '10px'
          }}
        >
          <Quote size={28} />
        </div>

        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              letterSpacing: '-0.025em',
              marginBottom: '1rem'
            }}
          >
            "{content.quoteText}"
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            {content.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
