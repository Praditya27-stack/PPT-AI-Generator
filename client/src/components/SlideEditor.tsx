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
  Scissors,
  FileText,
  LayoutGrid,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  Shield,
  Cpu,
  BarChart3,
  TrendingUp,
  Layers,
  Activity,
  CheckCircle2,
  Quote,
  Zap
} from 'lucide-react';

interface SlideEditorProps {
  slide: Slide;
  deckTitle: string;
  isRefining: boolean;
  onUpdateSlide: (updatedSlide: Slide) => void;
  onRefineSlide: (action: 'shorten' | 'expand' | 'rewrite' | 'change_layout', targetLayout?: string) => void;
  onAddSlide: () => void;
  onDeleteSlide: () => void;
  onMoveSlide: (direction: 'up' | 'down') => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onDoneEditing: () => void;
}

const getSemanticIcon = (iconName?: string) => {
  const name = (iconName || '').toLowerCase();
  if (name.includes('shield') || name.includes('sec')) return <Shield size={18} />;
  if (name.includes('cpu') || name.includes('ai') || name.includes('tech')) return <Cpu size={18} />;
  if (name.includes('bar') || name.includes('chart') || name.includes('data')) return <BarChart3 size={18} />;
  if (name.includes('trend') || name.includes('grow')) return <TrendingUp size={18} />;
  if (name.includes('zap') || name.includes('speed')) return <Zap size={18} />;
  if (name.includes('layer')) return <Layers size={18} />;
  if (name.includes('activity')) return <Activity size={18} />;
  return <CheckCircle2 size={18} />;
};

export const SlideEditor: React.FC<SlideEditorProps> = ({
  slide,
  deckTitle,
  isRefining,
  onUpdateSlide,
  onRefineSlide,
  onAddSlide,
  onDeleteSlide,
  onMoveSlide,
  canMoveUp,
  canMoveDown,
  onDoneEditing
}) => {
  const handleTitleChange = (newTitle: string) => {
    onUpdateSlide({ ...slide, title: newTitle });
  };

  const handleSubtitleChange = (newSubtitle: string) => {
    onUpdateSlide({ ...slide, subtitle: newSubtitle });
  };

  const handleEyebrowChange = (newEyebrow: string) => {
    onUpdateSlide({ ...slide, eyebrow: newEyebrow });
  };

  const handleSpeakerNotesChange = (newNotes: string) => {
    onUpdateSlide({ ...slide, speakerNotes: newNotes });
  };

  const handleContentChange = (newContent: Slide['content']) => {
    onUpdateSlide({ ...slide, content: newContent });
  };

  return (
    <div style={{ width: '100%', maxWidth: '1060px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Editor Command Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '0.75rem 1.25rem',
          backgroundColor: 'rgba(18, 21, 32, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Left AI Refine Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginRight: '4px'
            }}
          >
            Refinemen AI:
          </span>

          {/* Perpendek */}
          <button
            type="button"
            className="btn-secondary"
            disabled={isRefining}
            onClick={() => onRefineSlide('shorten')}
            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
            title="Pangkas teks dan buat kalimat lebih padat"
          >
            <Scissors size={13} />
            <span>{isRefining ? 'Memproses...' : 'Perpendek'}</span>
          </button>

          {/* Perpanjang */}
          <button
            type="button"
            className="btn-secondary"
            disabled={isRefining}
            onClick={() => onRefineSlide('expand')}
            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
            title="Tambah detail operasional dan konteks nyata"
          >
            <FileText size={13} />
            <span>{isRefining ? 'Memproses...' : 'Perpanjang'}</span>
          </button>

          {/* Ubah Layout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <LayoutGrid size={13} style={{ color: 'var(--text-muted)' }} />
            <select
              value={slide.layout}
              disabled={isRefining}
              onChange={(e) => onRefineSlide('change_layout', e.target.value)}
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                padding: '5px 8px',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              <option value="hero">Layout: Hero</option>
              <option value="cards">Layout: Cards (2-4 Kolom)</option>
              <option value="stats">Layout: Stats (Angka)</option>
              <option value="timeline">Layout: Timeline</option>
              <option value="callout">Layout: Callout</option>
              <option value="comparison">Layout: Comparison (Perbandingan)</option>
            </select>

            {/* Layout Variant Dropdown */}
            <select
              value={slide.layoutVariant || 'default'}
              disabled={isRefining}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e) => onUpdateSlide({ ...slide, layoutVariant: e.target.value as any })}
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--accent-text)',
                padding: '5px 8px',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
              title="Varian visual desain"
            >
              <option value="default">Varian: Default</option>
              {slide.layout === 'cards' && (
                <>
                  <option value="bento_featured">Bento Featured (Apple/Gamma)</option>
                  <option value="grid_3">Grid 3 Kolom</option>
                  <option value="grid_2_detailed">Grid 2 Kolom Detail</option>
                </>
              )}
              {slide.layout === 'stats' && (
                <>
                  <option value="giant_highlight">Giant Highlight (1 Headline + 2 Detail)</option>
                  <option value="dashboard_3">Dashboard 3 Metrik</option>
                </>
              )}
              {slide.layout === 'timeline' && (
                <>
                  <option value="horizontal_roadmap">Horizontal Roadmap</option>
                  <option value="vertical_steps">Vertical Stepped Cards</option>
                </>
              )}
              {slide.layout === 'hero' && (
                <>
                  <option value="split_showcase">Split Diagram Showcase</option>
                  <option value="centered_display">Centered Typography</option>
                </>
              )}
              {slide.layout === 'callout' && (
                <>
                  <option value="quote_matrix">Quote Matrix</option>
                  <option value="key_takeaways">Key Takeaways Cards</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Right Slide Management */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onMoveSlide('up')}
            disabled={!canMoveUp || isRefining}
            style={{ padding: '6px 8px' }}
            title="Geser Slide ke Kiri"
          >
            <ArrowUp size={13} />
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onMoveSlide('down')}
            disabled={!canMoveDown || isRefining}
            style={{ padding: '6px 8px' }}
            title="Geser Slide ke Kanan"
          >
            <ArrowDown size={13} />
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={onAddSlide}
            disabled={isRefining}
            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
          >
            <Plus size={13} />
            <span>Tambah</span>
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={onDeleteSlide}
            disabled={isRefining}
            style={{ padding: '6px 8px', color: 'var(--danger)', borderColor: 'var(--border-subtle)' }}
            title="Hapus Slide Ini"
          >
            <Trash2 size={13} />
          </button>

          {/* Selesai / Gini Aja */}
          <button
            type="button"
            className="btn-primary"
            onClick={onDoneEditing}
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            <Check size={13} />
            <span>Selesai (Gini Aja)</span>
          </button>
        </div>
      </div>

      {/* Main Slide Stage (Editable) */}
      <div className="slide-stage-container" style={{ position: 'relative' }}>
        {/* Subtle edit notice */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            fontSize: '0.7rem',
            color: 'var(--text-muted)'
          }}
        >
          Klik bidang teks untuk mengedit langsung
        </div>

        {/* Slide Header */}
        {slide.layout !== 'hero' && (
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                value={slide.eyebrow || ''}
                onChange={(e) => handleEyebrowChange(e.target.value)}
                placeholder={slide.layout.toUpperCase()}
                title="Klik untuk mengubah Eyebrow / Kategori slide"
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--accent-surface)',
                  color: 'var(--accent-text)',
                  border: '1px solid var(--border-subtle)',
                  width: 'fit-content',
                  maxWidth: '300px'
                }}
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Slide {slide.slideNumber}
              </span>
            </div>

            {/* Editable Title */}
            <input
              type="text"
              value={slide.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Judul Slide (Action Statement)..."
              style={{
                width: '100%',
                fontSize: '1.9rem',
                fontWeight: 800,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.035em',
                color: 'var(--text-primary)',
                marginBottom: '6px'
              }}
            />

            {/* Editable Subtitle */}
            <input
              type="text"
              value={slide.subtitle || ''}
              onChange={(e) => handleSubtitleChange(e.target.value)}
              placeholder="Subjudul atau penjelasan pendukung..."
              style={{
                width: '100%',
                fontSize: '1rem',
                fontFamily: "'DM Sans', sans-serif",
                color: 'var(--text-secondary)'
              }}
            />

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

        {/* Slide Content Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {slide.layout === 'hero' && (
            <EditableHeroLayout
              content={slide.content as HeroContent}
              title={slide.title}
              eyebrow={slide.eyebrow}
              onEyebrowChange={handleEyebrowChange}
              onTitleChange={handleTitleChange}
              onContentChange={handleContentChange}
            />
          )}
          {slide.layout === 'cards' && (
            <EditableCardsLayout
              content={slide.content as CardsContent}
              onContentChange={handleContentChange}
            />
          )}
          {slide.layout === 'stats' && (
            <EditableStatsLayout
              content={slide.content as StatsContent}
              onContentChange={handleContentChange}
            />
          )}
          {slide.layout === 'timeline' && (
            <EditableTimelineLayout
              content={slide.content as TimelineContent}
              onContentChange={handleContentChange}
            />
          )}
          {slide.layout === 'callout' && (
            <EditableCalloutLayout
              content={slide.content as CalloutContent}
              onContentChange={handleContentChange}
            />
          )}
          {slide.layout === 'comparison' && (
            <EditableComparisonLayout
              content={slide.content as ComparisonContent}
              onContentChange={handleContentChange}
            />
          )}
        </div>

        {/* Speaker Notes Editor (Gamma-style) */}
        <div
          style={{
            marginTop: '1.25rem',
            marginBottom: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-surface-sunken)',
            borderLeft: '3px solid var(--accent)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderLeftWidth: '3px',
            borderLeftColor: 'var(--accent)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
        >
          <label
            style={{
              fontWeight: 700,
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--accent-text)'
            }}
          >
            Catatan Presenter (Speaker Notes):
          </label>
          <textarea
            value={slide.speakerNotes || ''}
            onChange={(e) => handleSpeakerNotesChange(e.target.value)}
            placeholder="Tuliskan catatan atau panduan berbicara saat membawakan slide ini..."
            rows={2}
            style={{
              width: '100%',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent',
              border: 'none',
              resize: 'vertical',
              outline: 'none',
              lineHeight: 1.45
            }}
          />
        </div>

        {/* Footer */}
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
          <span>{deckTitle}</span>
          <span style={{ fontWeight: 600 }}>{slide.slideNumber}</span>
        </div>
      </div>
    </div>
  );
};

// 1. Hero
const EditableHeroLayout: React.FC<{
  content: HeroContent;
  title: string;
  eyebrow?: string;
  onEyebrowChange: (val: string) => void;
  onTitleChange: (val: string) => void;
  onContentChange: (newContent: HeroContent) => void;
}> = ({ content, title, eyebrow, onEyebrowChange, onTitleChange, onContentChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: '0.5rem 0' }}>
      <input
        type="text"
        value={eyebrow || content.badge || 'STRATEGIC BRIEFING'}
        onChange={(e) => {
          onEyebrowChange(e.target.value);
          onContentChange({ ...content, badge: e.target.value });
        }}
        placeholder="EYEBROW / KATEGORI HERO..."
        title="Klik untuk mengubah Eyebrow / Kategori Hero"
        style={{
          width: 'fit-content',
          padding: '4px 10px',
          fontSize: '0.74rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          backgroundColor: 'var(--accent-surface)',
          color: 'var(--accent-text)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px'
        }}
      />

      <textarea
        value={content.headline || title}
        onChange={(e) => {
          onTitleChange(e.target.value);
          onContentChange({ ...content, headline: e.target.value });
        }}
        rows={2}
        placeholder="Judul Utama (Statement Tajam)..."
        style={{
          width: '100%',
          fontSize: '2.4rem',
          fontWeight: 900,
          color: 'var(--text-primary)',
          resize: 'none'
        }}
      />

      {/* Gamma Signature Accent Divider */}
      <div
        style={{
          width: '56px',
          height: '3.5px',
          backgroundColor: 'var(--accent)',
          borderRadius: '2px',
          margin: '2px 0 6px'
        }}
      />

      <textarea
        value={content.subheadline || ''}
        onChange={(e) => onContentChange({ ...content, subheadline: e.target.value })}
        rows={2}
        placeholder="Penjelasan proposisi nilai..."
        style={{
          width: '100%',
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          resize: 'none'
        }}
      />

      <input
        type="text"
        value={content.author || ''}
        onChange={(e) => onContentChange({ ...content, author: e.target.value })}
        placeholder="Presenter atau Tim Penyusun..."
        style={{
          width: 'fit-content',
          fontSize: '0.85rem',
          color: 'var(--accent-text)',
          fontWeight: 600
        }}
      />
    </div>
  );
};

// 2. Cards
const EditableCardsLayout: React.FC<{
  content: CardsContent;
  onContentChange: (newContent: CardsContent) => void;
}> = ({ content, onContentChange }) => {
  const cards = content.cards || [];

  const updateCard = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [field]: value };
    onContentChange({ cards: updated });
  };

  const removeCard = (index: number) => {
    if (cards.length <= 2) return;
    onContentChange({ cards: cards.filter((_, i) => i !== index) });
  };

  const addCard = () => {
    if (cards.length >= 4) return;
    onContentChange({
      cards: [
        ...cards,
        { title: 'Poin Baru', description: 'Deskripsi ringkas mekanisme poin.', iconName: 'layers' }
      ]
    });
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cards.length <= 2 ? 2 : cards.length === 3 ? 3 : 4}, 1fr)`,
          gap: '1rem',
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
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {cards.length > 2 && (
              <button
                type="button"
                onClick={() => removeCard(idx)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
                title="Hapus Kartu"
              >
                ✕
              </button>
            )}

            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                backgroundColor: 'var(--accent-surface)',
                color: 'var(--accent-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem'
              }}
            >
              {getSemanticIcon(card.iconName)}
            </div>

            <input
              type="text"
              value={card.title}
              onChange={(e) => updateCard(idx, 'title', e.target.value)}
              placeholder="Judul Kartu..."
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}
            />

            <textarea
              value={card.description}
              onChange={(e) => updateCard(idx, 'description', e.target.value)}
              rows={3}
              placeholder="Deskripsi singkat..."
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                resize: 'none'
              }}
            />
          </div>
        ))}
      </div>

      {cards.length < 4 && (
        <button
          type="button"
          onClick={addCard}
          style={{
            marginTop: '10px',
            background: 'none',
            border: '1px dashed var(--border-strong)',
            color: 'var(--accent-text)',
            borderRadius: '4px',
            padding: '4px 10px',
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Plus size={13} /> Tambah Kolom Kartu
        </button>
      )}
    </div>
  );
};

// 3. Stats
const EditableStatsLayout: React.FC<{
  content: StatsContent;
  onContentChange: (newContent: StatsContent) => void;
}> = ({ content, onContentChange }) => {
  const stats = content.stats || [];

  const updateStat = (index: number, field: 'value' | 'label' | 'description', value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    onContentChange({ stats: updated });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length <= 2 ? 2 : stats.length === 3 ? 3 : 4}, 1fr)`,
        gap: '1rem',
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
            padding: '1.5rem 1rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <input
            type="text"
            className="font-mono"
            value={stat.value}
            onChange={(e) => updateStat(idx, 'value', e.target.value)}
            placeholder="85%+"
            style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              color: 'var(--accent-text)',
              textAlign: 'center'
            }}
          />

          <input
            type="text"
            value={stat.label}
            onChange={(e) => updateStat(idx, 'label', e.target.value)}
            placeholder="Label Metrik..."
            style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              textAlign: 'center'
            }}
          />

          <textarea
            value={stat.description}
            onChange={(e) => updateStat(idx, 'description', e.target.value)}
            rows={2}
            placeholder="Konteks metrik..."
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              resize: 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
};

// 4. Timeline
const EditableTimelineLayout: React.FC<{
  content: TimelineContent;
  onContentChange: (newContent: TimelineContent) => void;
}> = ({ content, onContentChange }) => {
  const steps = content.steps || [];

  const updateStep = (index: number, field: 'step' | 'title' | 'description', value: string) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    onContentChange({ steps: updated });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: '0.85rem',
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
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <input
            type="text"
            className="font-mono"
            value={item.step}
            onChange={(e) => updateStep(idx, 'step', e.target.value)}
            style={{
              width: '36px',
              height: '28px',
              borderRadius: '4px',
              backgroundColor: 'var(--accent-surface)',
              color: 'var(--accent-text)',
              textAlign: 'center',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}
          />

          <input
            type="text"
            value={item.title}
            onChange={(e) => updateStep(idx, 'title', e.target.value)}
            placeholder="Tahap..."
            style={{
              width: '100%',
              fontSize: '0.95rem',
              fontWeight: 700,
              textAlign: 'center'
            }}
          />

          <textarea
            value={item.description}
            onChange={(e) => updateStep(idx, 'description', e.target.value)}
            rows={3}
            placeholder="Deskripsi langkah..."
            style={{
              width: '100%',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              resize: 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
};

// 5. Callout
const EditableCalloutLayout: React.FC<{
  content: CalloutContent;
  onContentChange: (newContent: CalloutContent) => void;
}> = ({ content, onContentChange }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-subtle)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: '6px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <input
        type="text"
        value={content.highlightBadge || 'KESIMPULAN UTAMA'}
        onChange={(e) => onContentChange({ ...content, highlightBadge: e.target.value })}
        style={{
          width: 'fit-content',
          padding: '4px 8px',
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}
      />

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <Quote size={28} style={{ color: 'var(--accent)', flexShrink: 0, opacity: 0.9 }} />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <textarea
            value={content.quoteText}
            onChange={(e) => onContentChange({ ...content, quoteText: e.target.value })}
            rows={3}
            placeholder="Tesis utama..."
            style={{
              width: '100%',
              fontSize: '1.35rem',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              resize: 'none'
            }}
          />

          <textarea
            value={content.explanation}
            onChange={(e) => onContentChange({ ...content, explanation: e.target.value })}
            rows={2}
            placeholder="Penjelasan implikasi..."
            style={{
              width: '100%',
              fontSize: '0.95rem',
              color: 'var(--text-secondary)',
              resize: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};

// 6. Editable Comparison Layout
const EditableComparisonLayout: React.FC<{
  content: ComparisonContent;
  onContentChange: (newContent: ComparisonContent) => void;
}> = ({ content, onContentChange }) => {
  const left = content?.leftSide || { tag: 'TANTANGAN LAMA', title: '', points: [], highlight: '' };
  const right = content?.rightSide || { tag: 'SOLUSI TERINTEGRASI', title: '', points: [], highlight: '' };

  const handleLeftChange = (key: string, val: any) => {
    onContentChange({
      ...content,
      leftSide: { ...left, [key]: val }
    });
  };

  const handleRightChange = (key: string, val: any) => {
    onContentChange({
      ...content,
      rightSide: { ...right, [key]: val }
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%' }}>
      {/* Left Column Editor */}
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          backgroundColor: 'var(--bg-surface-elevated)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FDA4AF' }}>SISI KIRI:</span>
          <input
            type="text"
            value={left.tag}
            onChange={(e) => handleLeftChange('tag', e.target.value)}
            placeholder="Tag e.g. TANTANGAN LAMA"
            style={{ width: '100%', padding: '4px 8px', fontSize: '0.78rem' }}
          />
        </div>

        <input
          type="text"
          value={left.title}
          onChange={(e) => handleLeftChange('title', e.target.value)}
          placeholder="Judul Masalah/Tradisional"
          style={{ width: '100%', fontWeight: 700, fontSize: '1.1rem' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Poin-poin Masalah:</span>
          {left.points.map((pt, idx) => (
            <input
              key={idx}
              type="text"
              value={pt}
              onChange={(e) => {
                const updated = [...left.points];
                updated[idx] = e.target.value;
                handleLeftChange('points', updated);
              }}
              style={{ width: '100%', fontSize: '0.85rem' }}
            />
          ))}
        </div>

        <input
          type="text"
          value={left.highlight || ''}
          onChange={(e) => handleLeftChange('highlight', e.target.value)}
          placeholder="Highlight kesimpulan bawah"
          style={{ width: '100%', fontSize: '0.78rem', marginTop: 'auto' }}
        />
      </div>

      {/* Right Column Editor */}
      <div
        style={{
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          backgroundColor: 'var(--bg-surface-elevated)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6EE7B7' }}>SISI KANAN:</span>
          <input
            type="text"
            value={right.tag}
            onChange={(e) => handleRightChange('tag', e.target.value)}
            placeholder="Tag e.g. SOLUSI CERDAS"
            style={{ width: '100%', padding: '4px 8px', fontSize: '0.78rem' }}
          />
        </div>

        <input
          type="text"
          value={right.title}
          onChange={(e) => handleRightChange('title', e.target.value)}
          placeholder="Judul Solusi/Modern"
          style={{ width: '100%', fontWeight: 700, fontSize: '1.1rem' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Poin-poin Solusi:</span>
          {right.points.map((pt, idx) => (
            <input
              key={idx}
              type="text"
              value={pt}
              onChange={(e) => {
                const updated = [...right.points];
                updated[idx] = e.target.value;
                handleRightChange('points', updated);
              }}
              style={{ width: '100%', fontSize: '0.85rem' }}
            />
          ))}
        </div>

        <input
          type="text"
          value={right.highlight || ''}
          onChange={(e) => handleRightChange('highlight', e.target.value)}
          placeholder="Highlight kesimpulan bawah"
          style={{ width: '100%', fontSize: '0.78rem', marginTop: 'auto' }}
        />
      </div>
    </div>
  );
};
