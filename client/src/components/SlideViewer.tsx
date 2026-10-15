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
  Sparkles,
  Lock,
  Clock,
  Check
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

// 1. Hero Layout (Split Executive Hero with Visual Architecture Showcase Card)
const HeroLayout: React.FC<{ content: HeroContent; title: string; eyebrow?: string }> = ({ content, title, eyebrow }) => {
  const badgeText = eyebrow || content.badge;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.25fr 1fr',
        gap: '2.5rem',
        alignItems: 'center',
        height: '100%',
        padding: '0.5rem 0'
      }}
    >
      {/* Left Column: Typography & Key Value Highlights */}
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
            fontSize: '2.8rem',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.04em',
            marginBottom: '0.75rem'
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
            fontSize: '1.08rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
          }}
        >
          {content.subheadline}
        </p>

        {/* 3 Value Metric Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.75rem' }}>
          <div
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
            <Zap size={13} style={{ color: 'var(--accent-text)' }} />
            <span>ROI 4.8x Percepatan</span>
          </div>
          <div
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
            <Lock size={13} style={{ color: '#10B981' }} />
            <span>Privat Zero-Leak</span>
          </div>
          <div
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
            <Clock size={13} style={{ color: '#3B82F6' }} />
            <span>Pilot 4-Minggu</span>
          </div>
        </div>

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
              SA
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--accent-text)',
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              {content.author} • Briefing Eksekutif
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Visual Architecture Showcase Card */}
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
        {/* Card Window Top Bar */}
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
            <span>GEMINI 3.8 FLASH • LIVE</span>
          </div>
        </div>

        {/* Interactive Architecture Vector Graphic */}
        <div
          style={{
            padding: '1.25rem 0.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <svg width="100%" height="150" viewBox="0 0 340 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ambient Background Grid Pattern */}
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Connecting Neon Lines */}
            <path d="M 50 75 L 140 40 L 230 40 L 300 75" stroke="url(#lineGrad)" strokeWidth="2.5" strokeDasharray="4 3" filter="url(#glow)" />
            <path d="M 50 75 L 140 110 L 230 110 L 300 75" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="140" y1="40" x2="230" y2="110" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
            <line x1="140" y1="110" x2="230" y2="40" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />

            {/* Center Core Node */}
            <circle cx="185" cy="75" r="26" fill="rgba(139, 92, 246, 0.25)" stroke="#8B5CF6" strokeWidth="2" filter="url(#glow)" />
            <circle cx="185" cy="75" r="14" fill="#8B5CF6" />
            
            {/* Node 1: Input Database */}
            <circle cx="50" cy="75" r="16" fill="var(--bg-surface-elevated)" stroke="#A78BFA" strokeWidth="2" />
            
            {/* Node 2: 9router Gateway */}
            <circle cx="140" cy="40" r="14" fill="var(--bg-surface-elevated)" stroke="#3B82F6" strokeWidth="2" />
            
            {/* Node 3: Memory Cache */}
            <circle cx="140" cy="110" r="14" fill="var(--bg-surface-elevated)" stroke="#06B6D4" strokeWidth="2" />
            
            {/* Node 4: Logic Generator */}
            <circle cx="230" cy="40" r="14" fill="var(--bg-surface-elevated)" stroke="#10B981" strokeWidth="2" />

            {/* Node 5: Pure PPTX Export */}
            <circle cx="300" cy="75" r="16" fill="var(--bg-surface-elevated)" stroke="#10B981" strokeWidth="2" />

            {/* Text Labels inside SVG */}
            <text x="50" y="108" fill="#94A3B8" fontSize="9" fontFamily="'Space Grotesk', sans-serif" textAnchor="middle" fontWeight="700">DATA</text>
            <text x="185" y="118" fill="#A78BFA" fontSize="10" fontFamily="'Space Grotesk', sans-serif" textAnchor="middle" fontWeight="800">CORE LLM</text>
            <text x="300" y="108" fill="#34D399" fontSize="9" fontFamily="'Space Grotesk', sans-serif" textAnchor="middle" fontWeight="700">PPTX</text>
          </svg>
        </div>

        {/* Floating Architecture Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div
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
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Memori Server VPS</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', fontWeight: 800, color: '#34D399' }}>&lt; 120 MB RAM</span>
          </div>

          <div
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
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Kecepatan Respon</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', fontWeight: 800, color: '#60A5FA' }}>Sub-Detik (9router)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Cards Layout (3 High-Craft Pillars with Gradient Top Rails & Highlight Pills)
const CardsLayout: React.FC<{ content: CardsContent }> = ({ content }) => {
  const cards = content.cards || [];
  const cardGradients = [
    'linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)',
    'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)',
    'linear-gradient(90deg, #10B981 0%, #14B8A6 100%)'
  ];
  const cardHighlights = [
    '✦ Pangkas 70% Siklus Repetitif',
    '✦ Akses Data Privat Zero-Leak',
    '✦ Enkripsi AES-256 GCM'
  ];

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
      {cards.map((card, idx) => (
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
              background: cardGradients[idx % cardGradients.length]
            }}
          />

          {/* Header Row: Icon + Pill Number */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-surface)',
                color: 'var(--accent-text)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.25)'
              }}
            >
              {getSemanticIcon(card.iconName)}
            </div>

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
              PILAR 0{idx + 1}
            </span>
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
              marginBottom: '1.25rem'
            }}
          >
            {card.description}
          </p>

          {/* Bottom Highlight Metric Chip */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              color: 'var(--accent-text)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {cardHighlights[idx % cardHighlights.length]}
          </div>
        </div>
      ))}
    </div>
  );
};

// 3. Stats Layout (Executive Data Dashboard with Benchmark Progress Bars)
const StatsLayout: React.FC<{ content: StatsContent }> = ({ content }) => {
  const stats = content.stats || [];
  const statCategoryTags = ['EFISIENSI WAKTU', 'REDUKSI BIAYA', 'MEMORI ARSITEKTUR'];
  const statTrends = ['▲ 380% vs Konvensional', '▼ 62% OpEx Terpangkas', '✔ Anti-OOM Guaranteed'];
  const progressPercents = [85, 62, 95];

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
          {/* Top Tag & Trend Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
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
              {statCategoryTags[idx % statCategoryTags.length]}
            </span>

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
              {statTrends[idx % statTrends.length]}
            </span>
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

          {/* Visual Benchmark Progress Bar */}
          <div style={{ margin: '0.75rem 0 1rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <span>Indeks Benchmark</span>
              <span style={{ fontWeight: 700, color: 'var(--text-secondary)' }}>{progressPercents[idx % progressPercents.length]}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', borderRadius: '9999px', backgroundColor: 'var(--bg-surface-sunken)', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${progressPercents[idx % progressPercents.length]}%`,
                  height: '100%',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, var(--accent) 0%, #34D399 100%)'
                }}
              />
            </div>
          </div>

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

// 4. Timeline Layout (Connected Strategic Roadmap with Progress Nodes)
const TimelineLayout: React.FC<{ content: TimelineContent }> = ({ content }) => {
  const steps = content.steps || [];
  const stepStatuses = [
    { label: 'SELESAI', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' },
    { label: 'SEDANG AKTIF', color: 'var(--accent-text)', bg: 'var(--accent-surface)' },
    { label: 'TARGET Q4', color: '#60A5FA', bg: 'rgba(59, 130, 246, 0.15)' }
  ];
  const stepDeliverables = [
    ['Kalkulasi alokasi RAM VPS & GPU budget', 'Identifikasi titik bottleneck proses manual'],
    ['Integrasi secure tunnel 9router privat', 'Uji validasi JSON skema Gemini Flash'],
    ['Peluncuran generator slide ke tim operasional', 'Pemantauan konsumsi memori <120MB real-time']
  ];

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
          const status = stepStatuses[idx % stepStatuses.length];
          const deliverables = stepDeliverables[idx % stepDeliverables.length];

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
                    border: `2px solid ${status.color}`,
                    color: status.color,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 16px ${status.color}40`
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
                    backgroundColor: status.bg,
                    color: status.color,
                    border: `1px solid ${status.color}30`
                  }}
                >
                  {status.label}
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
                  marginBottom: '1rem'
                }}
              >
                {item.description}
              </p>

              {/* Concrete Deliverables Checklist */}
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
                    <Check size={12} style={{ color: status.color, marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ lineHeight: 1.4 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 5. Callout Layout (Executive Strategic Conclusion & Action Framework)
const CalloutLayout: React.FC<{ content: CalloutContent }> = ({ content }) => {
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
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
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

      {/* 2-Column Strategic Action Matrix */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.25rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-surface-sunken)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: 'var(--accent-text)', marginBottom: '6px' }}>
            <Zap size={14} />
            <span>Prioritas Eksekusi Minggu Ini</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            Audit seluruh pipeline dokumen & eliminasi dependensi headless browser yang membebani server RAM.
          </p>
        </div>

        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            backgroundColor: 'var(--bg-surface-sunken)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: '#34D399', marginBottom: '6px' }}>
            <CheckCircle2 size={14} />
            <span>Target Pencapaian Terukur</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            Automasi penuh alur pembuatan presentasi dengan akselerasi 4.8x dan kepatuhan memori VPS &lt;120MB.
          </p>
        </div>
      </div>
    </div>
  );
};
