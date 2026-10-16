import React from 'react';
import type {
  Slide,
  HeroContent,
  CardsContent,
  StatsContent,
  TimelineContent,
  CalloutContent,
  ComparisonContent
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
  Sparkles,
  Check,
  Heart,
  Coffee,
  BookOpen,
  Users,
  Rocket,
  Target,
  Star,
  Globe,
  Search,
  Award,
  Lightbulb,
  Compass,
  Briefcase,
  X
} from 'lucide-react';

interface SlideViewerProps {
  slide: Slide;
  deckTitle: string;
  showSpeakerNotes?: boolean;
}

const getSemanticIcon = (iconName?: string) => {
  const name = (iconName || '').toLowerCase();
  if (name.includes('shield') || name.includes('sec')) return <Shield size={20} />;
  if (name.includes('cpu') || name.includes('tech') || name.includes('chip')) return <Cpu size={20} />;
  if (name.includes('bar') || name.includes('chart') || name.includes('graph')) return <BarChart3 size={20} />;
  if (name.includes('trend') || name.includes('grow')) return <TrendingUp size={20} />;
  if (name.includes('zap') || name.includes('speed') || name.includes('fast')) return <Zap size={20} />;
  if (name.includes('layer') || name.includes('stack')) return <Layers size={20} />;
  if (name.includes('activity') || name.includes('pulse')) return <Activity size={20} />;
  if (name.includes('heart') || name.includes('health') || name.includes('med')) return <Heart size={20} />;
  if (name.includes('coffee') || name.includes('food') || name.includes('cafe')) return <Coffee size={20} />;
  if (name.includes('book') || name.includes('edu') || name.includes('study')) return <BookOpen size={20} />;
  if (name.includes('user') || name.includes('people') || name.includes('team')) return <Users size={20} />;
  if (name.includes('rocket') || name.includes('launch')) return <Rocket size={20} />;
  if (name.includes('target') || name.includes('goal')) return <Target size={20} />;
  if (name.includes('star') || name.includes('fav')) return <Star size={20} />;
  if (name.includes('globe') || name.includes('world') || name.includes('inter')) return <Globe size={20} />;
  if (name.includes('search') || name.includes('find')) return <Search size={20} />;
  if (name.includes('award') || name.includes('win') || name.includes('badge')) return <Award size={20} />;
  if (name.includes('bulb') || name.includes('idea')) return <Lightbulb size={20} />;
  if (name.includes('compass') || name.includes('guide')) return <Compass size={20} />;
  if (name.includes('brief') || name.includes('work') || name.includes('biz')) return <Briefcase size={20} />;
  return <CheckCircle2 size={20} />;
};

const COLOR_MAP: Record<string, { gradient: string; solid: string; bg: string }> = {
  violet: { gradient: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)', solid: '#A78BFA', bg: 'rgba(139, 92, 246, 0.15)' },
  blue: { gradient: 'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)', solid: '#60A5FA', bg: 'rgba(59, 130, 246, 0.15)' },
  emerald: { gradient: 'linear-gradient(90deg, #10B981 0%, #14B8A6 100%)', solid: '#34D399', bg: 'rgba(16, 185, 129, 0.15)' },
  amber: { gradient: 'linear-gradient(90deg, #F59E0B 0%, #F97316 100%)', solid: '#FBBF24', bg: 'rgba(245, 158, 11, 0.15)' },
  rose: { gradient: 'linear-gradient(90deg, #F43F5E 0%, #FB7185 100%)', solid: '#FB7185', bg: 'rgba(244, 63, 94, 0.15)' },
  cyan: { gradient: 'linear-gradient(90deg, #06B6D4 0%, #3B82F6 100%)', solid: '#22D3EE', bg: 'rgba(6, 182, 212, 0.15)' }
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
                border: '1px solid var(--border-subtle)'
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

          {/* Gamma Signature Accent Divider */}
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
        {slide.layout === 'hero' && (
          slide.layoutVariant === 'centered_display'
            ? <CenteredHeroLayout content={slide.content as HeroContent} title={slide.title} eyebrow={slide.eyebrow} />
            : <HeroLayout content={slide.content as HeroContent} title={slide.title} eyebrow={slide.eyebrow} />
        )}
        {slide.layout === 'cards' && (
          slide.layoutVariant === 'bento_featured'
            ? <BentoCardsLayout content={slide.content as CardsContent} />
            : <CardsLayout content={slide.content as CardsContent} />
        )}
        {slide.layout === 'stats' && (
          slide.layoutVariant === 'giant_highlight'
            ? <GiantStatsLayout content={slide.content as StatsContent} />
            : <StatsLayout content={slide.content as StatsContent} />
        )}
        {slide.layout === 'timeline' && (
          slide.layoutVariant === 'vertical_steps'
            ? <VerticalStepsTimelineLayout content={slide.content as TimelineContent} />
            : <TimelineLayout content={slide.content as TimelineContent} />
        )}
        {slide.layout === 'callout' && (
          slide.layoutVariant === 'key_takeaways'
            ? <KeyTakeawaysLayout content={slide.content as CalloutContent} />
            : <CalloutLayout content={slide.content as CalloutContent} />
        )}
        {slide.layout === 'comparison' && (
          <ComparisonLayout content={slide.content as ComparisonContent} />
        )}
      </div>

      {/* Presenter Cue / Speaker Notes (Gamma-style) */}
      {showSpeakerNotes && slide.speakerNotes && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '0.8rem 1.1rem',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-surface-sunken)',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
            border: '1px solid var(--border-subtle)',
            borderLeft: '3.5px solid var(--accent)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)'
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
          <span style={{ lineHeight: 1.5 }}>{slide.speakerNotes}</span>
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

// 1. Hero Layout (Split or Centered depending on visualConcept)
const HeroLayout: React.FC<{ content: HeroContent; title: string; eyebrow?: string }> = ({ content, title, eyebrow }) => {
  const badgeText = eyebrow || content.badge;
  const hasVisual = !!content.visualConcept;
  const highlights = content.keyHighlights || [];
  const nodes = content.visualConcept?.nodes || [];
  const metrics = content.visualConcept?.metrics || [];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: hasVisual ? '1.2fr 1fr' : '1fr',
        gap: '2.5rem',
        alignItems: 'center',
        height: '100%',
        padding: '0.5rem 0'
      }}
    >
      {/* Left Column: Typography & Topic-Specific Highlights */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {badgeText && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '9999px',
              backgroundColor: 'var(--accent-surface)',
              color: 'var(--accent-text)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.1rem',
              width: 'fit-content',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 2px 10px rgba(139, 92, 246, 0.2)'
            }}
          >
            <Sparkles size={12} />
            <span>{badgeText}</span>
          </div>
        )}

        <h1
          className="text-gradient"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: hasVisual ? '2.8rem' : '3.4rem',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.04em',
            marginBottom: '0.75rem',
            maxWidth: hasVisual ? '100%' : '850px'
          }}
        >
          {content.headline || title}
        </h1>

        {/* Gamma Accent Divider */}
        <div
          style={{
            width: '56px',
            height: '4px',
            backgroundColor: 'var(--accent)',
            borderRadius: '9999px',
            marginBottom: '1.25rem'
          }}
        />

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            maxWidth: hasVisual ? '100%' : '780px'
          }}
        >
          {content.subheadline}
        </p>

        {/* Dynamic Key Value Chips (from AI) */}
        {highlights.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.75rem' }}>
            {highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              >
                <Sparkles size={12} style={{ color: 'var(--accent-text)' }} />
                <span>{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Author Tag */}
        {content.author && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {content.author.slice(0, 2).toUpperCase()}
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--accent-text)',
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {content.author}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Dynamic Concept Graphic Card (Only if visualConcept exists) */}
      {hasVisual && (
        <div
          className="card-frosted"
          style={{
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(18, 21, 32, 0.8) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Card Top Bar with Window Dots and Concept Label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--accent-text)'
              }}
            >
              <span className="pulsing-indicator" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span>{content.visualConcept?.badge || 'TINJAUAN KONSEP'}</span>
            </div>
          </div>

          {/* Dynamic Concept Node Visualization */}
          {nodes.length > 0 && (
            <div
              style={{
                padding: '1.25rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <svg width="100%" height="130" viewBox="0 0 340 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="dynamicLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Connecting Track Line */}
                <line x1="45" y1="65" x2="295" y2="65" stroke="url(#dynamicLineGrad)" strokeWidth="2" strokeDasharray="4 3" />

                {/* Render nodes dynamically across width */}
                {nodes.map((nodeText, nIdx) => {
                  const total = nodes.length;
                  const cx = total === 1 ? 170 : 45 + (nIdx * (250 / (total - 1)));
                  const isCenter = nIdx === 1 || nIdx === Math.floor(total / 2);

                  return (
                    <g key={nIdx}>
                      <circle
                        cx={cx}
                        cy="65"
                        r={isCenter ? 18 : 14}
                        fill="var(--bg-surface-elevated)"
                        stroke={isCenter ? '#8B5CF6' : 'var(--border-strong)'}
                        strokeWidth="2"
                      />
                      <circle cx={cx} cy="65" r={isCenter ? 8 : 5} fill={isCenter ? '#8B5CF6' : '#60A5FA'} />
                      <text
                        x={cx}
                        y={nIdx % 2 === 0 ? 102 : 32}
                        fill="var(--text-primary)"
                        fontSize="9"
                        fontFamily="'Space Grotesk', sans-serif"
                        textAnchor="middle"
                        fontWeight="700"
                      >
                        {nodeText.length > 15 ? nodeText.slice(0, 14) + '…' : nodeText}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {/* Dynamic Metrics (from AI) */}
          {metrics.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${metrics.length}, 1fr)`, gap: '8px' }}>
              {metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                  }}
                >
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {m.label}
                  </span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', fontWeight: 800, color: mIdx === 0 ? '#34D399' : '#60A5FA' }}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 2. Cards Layout (Dynamic Pillars with Adaptive Color Variants & Highlights)
const CardsLayout: React.FC<{ content: CardsContent }> = ({ content }) => {
  const cards = content.cards || [];
  const defaultVariants = ['violet', 'blue', 'emerald', 'amber', 'rose', 'cyan'];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cards.length <= 2 ? 2 : cards.length === 3 ? 3 : 4}, 1fr)`,
        gap: '1.4rem',
        width: '100%',
        padding: '0.5rem 0'
      }}
    >
      {cards.map((card, idx) => {
        const variantKey = card.colorVariant || defaultVariants[idx % defaultVariants.length];
        const colorConfig = COLOR_MAP[variantKey] || COLOR_MAP.violet;

        return (
          <div
            key={idx}
            className="card-frosted"
            style={{
              padding: '1.8rem 1.6rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Signature Gradient Rail */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: colorConfig.gradient
              }}
            />

            {/* Header Row: Icon + Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: colorConfig.bg,
                  color: colorConfig.solid,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 16px ${colorConfig.solid}30`
                }}
              >
                {getSemanticIcon(card.iconName)}
              </div>

              {card.badge && (
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {card.badge}
                </span>
              )}
            </div>

            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.28rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '0.65rem',
                lineHeight: 1.25,
                letterSpacing: '-0.02em'
              }}
            >
              {card.title}
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: card.highlight ? '1.25rem' : '0'
              }}
            >
              {card.description}
            </p>

            {/* Bottom Highlight Metric Chip (Dynamic from AI) */}
            {card.highlight && (
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: colorConfig.solid,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {card.highlight}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// 3. Stats Layout (Dynamic Dashboard Cards with Category & Trend Tags)
const StatsLayout: React.FC<{ content: StatsContent }> = ({ content }) => {
  const stats = content.stats || [];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length <= 2 ? 2 : stats.length === 3 ? 3 : 4}, 1fr)`,
        gap: '1.4rem',
        width: '100%',
        padding: '0.5rem 0'
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="card-frosted"
          style={{
            padding: '2rem 1.6rem',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {/* Top Category & Trend Badge (Dynamic) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', minHeight: '24px' }}>
            {stat.category ? (
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                {stat.category}
              </span>
            ) : <span />}

            {stat.trend && (
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: '#34D399',
                  border: '1px solid rgba(16, 185, 129, 0.25)'
                }}
              >
                {stat.trend}
              </span>
            )}
          </div>

          {/* Giant Impact Metric */}
          <div
            className="text-gradient"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '3.8rem',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: '0.75rem'
            }}
          >
            {stat.value}
          </div>

          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.01em'
            }}
          >
            {stat.label}
          </div>

          {/* Visual Benchmark Progress Bar (Only if progressPercent exists) */}
          {stat.progressPercent !== undefined && (
            <div style={{ margin: '0.75rem 0 1rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>Pencapaian Benchmark</span>
                <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>{stat.progressPercent}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '9999px', backgroundColor: 'var(--bg-surface-sunken)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${Math.min(100, Math.max(5, stat.progressPercent))}%`,
                    height: '100%',
                    borderRadius: '9999px',
                    background: 'linear-gradient(90deg, var(--accent) 0%, #34D399 100%)'
                  }}
                />
              </div>
            </div>
          )}

          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              marginTop: 'auto'
            }}
          >
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. Timeline Layout (Dynamic Strategic Roadmap with Steps & Deliverables)
const TimelineLayout: React.FC<{ content: TimelineContent }> = ({ content }) => {
  const steps = content.steps || [];

  return (
    <div style={{ width: '100%', padding: '0.5rem 0', position: 'relative' }}>
      {/* Horizontal Connected Line */}
      <div
        style={{
          position: 'absolute',
          top: '36px',
          left: '10%',
          right: '10%',
          height: '3px',
          background: 'linear-gradient(90deg, #10B981 0%, var(--accent) 50%, #3B82F6 100%)',
          zIndex: 0,
          opacity: 0.6
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          gap: '1.4rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        {steps.map((item, idx) => {
          const deliverables = item.deliverables || [];
          const statusText = item.status || `FASE ${idx + 1}`;

          return (
            <div
              key={idx}
              className="card-frosted"
              style={{
                padding: '1.6rem 1.4rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Step Node Circle + Status Pill */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '2px solid var(--accent)',
                    color: 'var(--accent-text)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 16px rgba(139, 92, 246, 0.3)'
                  }}
                >
                  {item.step}
                </div>

                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'var(--accent-surface)',
                    color: 'var(--accent-text)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {statusText}
                </span>
              </div>

              <h4
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.22rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.25
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
                  marginBottom: deliverables.length > 0 ? '1rem' : '0'
                }}
              >
                {item.description}
              </p>

              {/* Concrete Deliverables Checklist (from AI) */}
              {deliverables.length > 0 && (
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  {deliverables.map((d, dIdx) => (
                    <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      <Check size={12} style={{ color: 'var(--accent-text)', marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ lineHeight: 1.4 }}>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 5. Callout Layout (Executive Strategic Conclusion & Action Matrix)
const CalloutLayout: React.FC<{ content: CalloutContent }> = ({ content }) => {
  const actionItems = content.actionItems || [];

  return (
    <div
      className="card-frosted"
      style={{
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(139, 92, 246, 0.09) 40%, rgba(18, 21, 32, 0.9) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 24px 60px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.15)'
      }}
    >
      {/* Decorative Giant Quote Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '-15px',
          right: '25px',
          fontSize: '12rem',
          fontFamily: 'serif',
          color: 'rgba(255, 255, 255, 0.025)',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1
        }}
      >
        “
      </div>

      {content.highlightBadge && (
        <div style={{ marginBottom: '1.25rem' }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: 'var(--accent-surface)',
              color: 'var(--accent-text)',
              border: '1px solid var(--accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={11} />
            <span>{content.highlightBadge}</span>
          </span>
        </div>
      )}

      {/* Quote Statement */}
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: actionItems.length > 0 ? '1.75rem' : '0' }}>
        <div
          style={{
            color: 'var(--accent)',
            flexShrink: 0,
            padding: '10px',
            backgroundColor: 'var(--accent-surface)',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.25)'
          }}
        >
          <Quote size={30} />
        </div>

        <div>
          <p
            className="text-gradient"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.85rem',
              fontWeight: 800,
              lineHeight: 1.3,
              letterSpacing: '-0.025em',
              marginBottom: '0.75rem'
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

      {/* Dynamic Action Matrix (from AI) */}
      {actionItems.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${actionItems.length}, 1fr)`,
            gap: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          {actionItems.map((act, aIdx) => (
            <div
              key={aIdx}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-surface-sunken)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: aIdx === 0 ? 'var(--accent-text)' : '#34D399' }}>
                  {act.title}
                </span>
                {act.tag && (
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>
                    {act.tag}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {act.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 6. Comparison Layout (Side-by-Side Before vs After / Traditional vs Modern)
const ComparisonLayout: React.FC<{ content: ComparisonContent }> = ({ content }) => {
  const left = content?.leftSide;
  const right = content?.rightSide;

  if (!left || !right) return null;

  return (
    <div style={{ position: 'relative', width: '100%', padding: '0.5rem 0' }}>
      {/* Floating Center VS Badge */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '2px solid var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.85rem',
          fontWeight: 800,
          color: 'var(--accent-text)',
          boxShadow: '0 0 24px rgba(139, 92, 246, 0.4)'
        }}
      >
        VS
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'stretch'
        }}
      >
        {/* Left Column: Problem / Traditional */}
        <div
          className="card-frosted"
          style={{
            padding: '2rem 1.8rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            background: 'linear-gradient(145deg, rgba(244, 63, 94, 0.05) 0%, rgba(18, 21, 32, 0.8) 100%)'
          }}
        >
          {/* Top Rail */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #F43F5E 0%, #FB7185 100%)'
            }}
          />

          <div style={{ marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(244, 63, 94, 0.15)',
                color: '#FDA4AF',
                border: '1px solid rgba(244, 63, 94, 0.25)'
              }}
            >
              {left.tag}
            </span>
          </div>

          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '1.25rem'
            }}
          >
            {left.title}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {left.points.map((pt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(244, 63, 94, 0.15)',
                    color: '#FB7185',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  <X size={12} />
                </div>
                <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {pt}
                </span>
              </div>
            ))}
          </div>

          {left.highlight && (
            <div
              style={{
                marginTop: 'auto',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                fontSize: '0.82rem',
                color: '#FDA4AF',
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {left.highlight}
            </div>
          )}
        </div>

        {/* Right Column: Solution / Modern */}
        <div
          className="card-frosted"
          style={{
            padding: '2rem 1.8rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, rgba(18, 21, 32, 0.8) 100%)',
            boxShadow: '0 12px 32px rgba(16, 185, 129, 0.12)'
          }}
        >
          {/* Top Rail */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)'
            }}
          />

          <div style={{ marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                color: '#6EE7B7',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}
            >
              {right.tag}
            </span>
          </div>

          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.25,
              marginBottom: '1.25rem'
            }}
          >
            {right.title}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {right.points.map((pt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#34D399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  <Check size={12} />
                </div>
                <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {pt}
                </span>
              </div>
            ))}
          </div>

          {right.highlight && (
            <div
              style={{
                marginTop: 'auto',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontSize: '0.82rem',
                color: '#6EE7B7',
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {right.highlight}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Bento Featured Layout: 1 Dominant Card on Left + 2 Stacked Cards on Right
const BentoCardsLayout: React.FC<{ content: CardsContent }> = ({ content }) => {
  const cards = content.cards || [];
  if (cards.length === 0) return null;

  const heroCard = cards[0];
  const sideCards = cards.slice(1, 3);
  const heroColor = COLOR_MAP[heroCard.colorVariant || 'violet'] || COLOR_MAP.violet;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: sideCards.length > 0 ? '1.25fr 1fr' : '1fr',
        gap: '1.4rem',
        alignItems: 'stretch',
        width: '100%',
        padding: '0.5rem 0'
      }}
    >
      {/* Featured Dominant Card (Bento Left) */}
      <div
        className="card-frosted"
        style={{
          padding: '2.2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.06) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(18, 21, 32, 0.9) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: heroColor.gradient
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '14px',
              backgroundColor: heroColor.bg,
              color: heroColor.solid,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 6px 20px ${heroColor.solid}35`
            }}
          >
            {getSemanticIcon(heroCard.iconName)}
          </div>

          {heroCard.badge && (
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.74rem',
                fontWeight: 800,
                color: heroColor.solid,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: heroColor.bg,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {heroCard.badge}
            </span>
          )}
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.65rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '0.85rem',
            lineHeight: 1.25,
            letterSpacing: '-0.025em'
          }}
        >
          {heroCard.title}
        </h3>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.02rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            marginBottom: '1.5rem'
          }}
        >
          {heroCard.description}
        </p>

        {heroCard.highlight && (
          <div
            style={{
              marginTop: 'auto',
              padding: '0.9rem 1.1rem',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-surface-sunken)',
              border: `1px solid ${heroColor.solid}35`,
              fontSize: '0.86rem',
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              color: heroColor.solid,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {heroCard.highlight}
          </div>
        )}
      </div>

      {/* Stacked Right Side Cards */}
      {sideCards.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'space-between' }}>
          {sideCards.map((card, idx) => {
            const sideColor = COLOR_MAP[card.colorVariant || (idx === 0 ? 'blue' : 'emerald')] || COLOR_MAP.blue;
            return (
              <div
                key={idx}
                className="card-frosted"
                style={{
                  padding: '1.4rem 1.4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  flex: 1
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: sideColor.gradient
                  }}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: sideColor.bg,
                      color: sideColor.solid,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getSemanticIcon(card.iconName)}
                  </div>
                  {card.badge && (
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>

                <h4
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '0.4rem',
                    lineHeight: 1.25
                  }}
                >
                  {card.title}
                </h4>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: card.highlight ? '0.75rem' : '0'
                  }}
                >
                  {card.description}
                </p>

                {card.highlight && (
                  <div
                    style={{
                      marginTop: 'auto',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: sideColor.solid
                    }}
                  >
                    {card.highlight}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Giant Highlight Stats Layout: 1 Colossal Metric on Left + 2 Stacked Metrics on Right
const GiantStatsLayout: React.FC<{ content: StatsContent }> = ({ content }) => {
  const stats = content.stats || [];
  if (stats.length === 0) return null;

  const giantStat = stats[0];
  const subStats = stats.slice(1, 3);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: subStats.length > 0 ? '1.25fr 1fr' : '1fr',
        gap: '1.5rem',
        alignItems: 'stretch',
        width: '100%',
        padding: '0.5rem 0'
      }}
    >
      {/* Colossal Highlight Card */}
      <div
        className="card-frosted"
        style={{
          padding: '2.4rem 2.2rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(139, 92, 246, 0.12) 60%, rgba(18, 21, 32, 0.9) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: 'var(--accent-surface)',
              color: 'var(--accent-text)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {giantStat.category || 'METRIK PERFORMA KUNCI'}
          </span>

          {giantStat.trend && (
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'rgba(16, 185, 129, 0.18)',
                color: '#34D399',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}
            >
              {giantStat.trend}
            </span>
          )}
        </div>

        {/* Colossal Stat Number */}
        <div
          className="text-gradient"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '5.2rem',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            marginBottom: '0.85rem'
          }}
        >
          {giantStat.value}
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em'
          }}
        >
          {giantStat.label}
        </div>

        {giantStat.progressPercent !== undefined && (
          <div style={{ margin: '0.75rem 0 1.25rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
              <span>Pencapaian vs Target</span>
              <span style={{ fontWeight: 700, color: '#34D399' }}>{giantStat.progressPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '7px', borderRadius: '9999px', backgroundColor: 'var(--bg-surface-sunken)', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${Math.min(100, Math.max(5, giantStat.progressPercent))}%`,
                  height: '100%',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, var(--accent) 0%, #34D399 100%)'
                }}
              />
            </div>
          </div>
        )}

        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.96rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginTop: 'auto'
          }}
        >
          {giantStat.description}
        </div>
      </div>

      {/* Sub Stats Stacked */}
      {subStats.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'space-between' }}>
          {subStats.map((st, idx) => (
            <div
              key={idx}
              className="card-frosted"
              style={{
                padding: '1.5rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase'
                  }}
                >
                  {st.category || `INDIKATOR 0${idx + 2}`}
                </span>
                {st.trend && (
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(59, 130, 246, 0.15)',
                      color: '#60A5FA'
                    }}
                  >
                    {st.trend}
                  </span>
                )}
              </div>

              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '2.8rem',
                  fontWeight: 800,
                  color: idx === 0 ? '#60A5FA' : '#34D399',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  marginBottom: '0.4rem'
                }}
              >
                {st.value}
              </div>

              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem'
                }}
              >
                {st.label}
              </div>

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginTop: 'auto'
                }}
              >
                {st.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Centered Hero Layout
const CenteredHeroLayout: React.FC<{ content: HeroContent; title: string; eyebrow?: string }> = ({ content, title, eyebrow }) => {
  const badgeText = eyebrow || content.badge;
  const highlights = content.keyHighlights || [];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '1.5rem 1rem',
        maxWidth: '920px',
        margin: '0 auto'
      }}
    >
      {badgeText && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '9999px',
            backgroundColor: 'var(--accent-surface)',
            color: 'var(--accent-text)',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.76rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 2px 12px rgba(139, 92, 246, 0.25)'
          }}
        >
          <Sparkles size={12} />
          <span>{badgeText}</span>
        </div>
      )}

      <h1
        className="text-gradient"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '3.3rem',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.04em',
          marginBottom: '1rem'
        }}
      >
        {content.headline || title}
      </h1>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          marginBottom: '2rem',
          maxWidth: '780px'
        }}
      >
        {content.subheadline}
      </p>

      {highlights.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '2rem' }}>
          {highlights.map((h, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
              }}
            >
              <Sparkles size={13} style={{ color: 'var(--accent-text)' }} />
              <span>{h}</span>
            </div>
          ))}
        </div>
      )}

      {content.author && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Disajikan oleh:</span>
          <span style={{ fontSize: '0.88rem', color: 'var(--accent-text)', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
            {content.author}
          </span>
        </div>
      )}
    </div>
  );
};

// Vertical / Staggered Progression Steps Timeline
const VerticalStepsTimelineLayout: React.FC<{ content: TimelineContent }> = ({ content }) => {
  const steps = content.steps || [];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: '1.25rem',
        width: '100%',
        padding: '0.5rem 0'
      }}
    >
      {steps.map((item, idx) => {
        const deliverables = item.deliverables || [];
        const isTarget = item.status?.includes('TARGET') || idx === steps.length - 1;

        return (
          <div
            key={idx}
            className="card-frosted"
            style={{
              padding: '1.8rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              transform: `translateY(${idx * 10}px)`,
              border: isTarget ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
              background: isTarget
                ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.07) 0%, rgba(18, 21, 32, 0.85) 100%)'
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(18, 21, 32, 0.8) 100%)'
            }}
          >
            {/* Step Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: isTarget ? 'rgba(16, 185, 129, 0.2)' : 'var(--accent-surface)',
                  color: isTarget ? '#34D399' : 'var(--accent-text)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isTarget ? '1px solid #10B981' : '1px solid var(--accent)'
                }}
              >
                {item.step}
              </div>

              {item.status && (
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '5px',
                    backgroundColor: isTarget ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: isTarget ? '#34D399' : 'var(--text-muted)'
                  }}
                >
                  {item.status}
                </span>
              )}
            </div>

            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.22rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '0.6rem',
                lineHeight: 1.25
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
                marginBottom: deliverables.length > 0 ? '1rem' : '0'
              }}
            >
              {item.description}
            </p>

            {deliverables.length > 0 && (
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                {deliverables.map((d, dIdx) => (
                  <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    <Check size={12} style={{ color: isTarget ? '#34D399' : 'var(--accent-text)', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.4 }}>{d}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Key Takeaways Layout
const KeyTakeawaysLayout: React.FC<{ content: CalloutContent }> = ({ content }) => {
  const actionItems = content.actionItems || [];

  return (
    <div style={{ width: '100%', padding: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Central Thesis Bar */}
      <div
        className="card-frosted"
        style={{
          padding: '1.8rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(18, 21, 32, 0.9) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            backgroundColor: 'var(--accent-surface)',
            color: 'var(--accent-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: '1px solid var(--border-subtle)'
          }}
        >
          <Quote size={22} />
        </div>
        <div>
          <p
            className="text-gradient"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.35rem',
              fontWeight: 800,
              lineHeight: 1.35,
              marginBottom: '4px'
            }}
          >
            "{content.quoteText}"
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            {content.explanation}
          </p>
        </div>
      </div>

      {/* Action Items Cards */}
      {actionItems.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${actionItems.length}, 1fr)`, gap: '1.25rem' }}>
          {actionItems.map((act, idx) => (
            <div
              key={idx}
              className="card-frosted"
              style={{
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: idx === 0 ? 'var(--accent-text)' : '#34D399'
                  }}
                >
                  {act.tag || `LANGKAH 0${idx + 1}`}
                </span>
                <CheckCircle2 size={16} style={{ color: idx === 0 ? 'var(--accent-text)' : '#34D399' }} />
              </div>

              <h4
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3
                }}
              >
                {act.title}
              </h4>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55
                }}
              >
                {act.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
