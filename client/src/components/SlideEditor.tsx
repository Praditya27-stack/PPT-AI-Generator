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

  const handleContentChange = (newContent: Slide['content']) => {
    onUpdateSlide({ ...slide, content: newContent });
  };

  return (
    <div style={{ width: '100%', maxWidth: '1050px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Editor Command Toolbar */}
      <div
        className="studio-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '0.65rem 1rem'
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

            {/* Editable Title */}
            <input
              type="text"
              value={slide.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Judul Slide (Action Statement)..."
              style={{
                width: '100%',
                fontSize: '1.75rem',
                fontWeight: 800,
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
                fontSize: '0.95rem',
                color: 'var(--text-secondary)'
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
  onTitleChange: (val: string) => void;
  onContentChange: (newContent: HeroContent) => void;
}> = ({ content, title, onTitleChange, onContentChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: '0.5rem 0' }}>
      <input
        type="text"
        value={content.badge || 'STRATEGIC BRIEFING'}
        onChange={(e) => onContentChange({ ...content, badge: e.target.value })}
        style={{
          width: 'fit-content',
          padding: '4px 10px',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
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
