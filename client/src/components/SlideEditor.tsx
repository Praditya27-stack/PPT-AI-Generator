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
  Sparkles,
  Check,
  Zap,
  Shield,
  Cpu,
  BarChart3,
  TrendingUp,
  Rocket,
  Layers,
  Activity,
  CheckCircle2,
  Quote
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

const getIcon = (iconName?: string) => {
  const name = (iconName || '').toLowerCase();
  if (name.includes('zap') || name.includes('speed') || name.includes('auto')) return <Zap size={22} />;
  if (name.includes('shield') || name.includes('sec')) return <Shield size={22} />;
  if (name.includes('cpu') || name.includes('ai') || name.includes('tech')) return <Cpu size={22} />;
  if (name.includes('bar') || name.includes('chart') || name.includes('data')) return <BarChart3 size={22} />;
  if (name.includes('trend') || name.includes('grow')) return <TrendingUp size={22} />;
  if (name.includes('rocket') || name.includes('launch')) return <Rocket size={22} />;
  if (name.includes('layer')) return <Layers size={22} />;
  if (name.includes('activity')) return <Activity size={22} />;
  if (name.includes('check')) return <CheckCircle2 size={22} />;
  return <Sparkles size={22} />;
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
  // Helpers to update slide fields
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
    <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* AI Quick Actions Toolbar */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '0.75rem 1.25rem',
          borderRadius: '16px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid var(--accent)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginRight: '6px'
            }}
          >
            <Sparkles size={14} /> AI CO-PILOT:
          </span>

          {/* Perpendek Button */}
          <button
            type="button"
            className="btn-secondary"
            disabled={isRefining}
            onClick={() => onRefineSlide('shorten')}
            style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px' }}
            title="Pangkas kata berlebih dan buat pesan lebih tajam"
          >
            <Scissors size={14} style={{ color: 'var(--accent)' }} />
            <span>{isRefining ? 'Memproses...' : 'Perpendek'}</span>
          </button>

          {/* Perpanjang Button */}
          <button
            type="button"
            className="btn-secondary"
            disabled={isRefining}
            onClick={() => onRefineSlide('expand')}
            style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px' }}
            title="Tambahkan rincian operasional dan kedalaman mekanisme"
          >
            <FileText size={14} style={{ color: 'var(--accent-secondary)' }} />
            <span>{isRefining ? 'Memproses...' : 'Perpanjang'}</span>
          </button>

          {/* Ubah Layout Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <LayoutGrid size={14} style={{ color: 'var(--text-muted)' }} />
            <select
              value={slide.layout}
              disabled={isRefining}
              onChange={(e) => onRefineSlide('change_layout', e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-primary)',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="hero" style={{ background: '#0F172A' }}>Layout: Hero</option>
              <option value="cards" style={{ background: '#0F172A' }}>Layout: Cards (2-4 Kolom)</option>
              <option value="stats" style={{ background: '#0F172A' }}>Layout: Stats (Angka Besar)</option>
              <option value="timeline" style={{ background: '#0F172A' }}>Layout: Timeline (Roadmap)</option>
              <option value="callout" style={{ background: '#0F172A' }}>Layout: Callout (Kutipan)</option>
            </select>
          </div>
        </div>

        {/* Slide Management (Move, Add, Delete, Done) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onMoveSlide('up')}
            disabled={!canMoveUp || isRefining}
            style={{ padding: '6px 10px', borderRadius: '8px' }}
            title="Geser Slide ke Kiri / Atas"
          >
            <ArrowUp size={14} />
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onMoveSlide('down')}
            disabled={!canMoveDown || isRefining}
            style={{ padding: '6px 10px', borderRadius: '8px' }}
            title="Geser Slide ke Kanan / Bawah"
          >
            <ArrowDown size={14} />
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={onAddSlide}
            disabled={isRefining}
            style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px' }}
            title="Tambah Slide Baru"
          >
            <Plus size={14} />
            <span>Tambah</span>
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={onDeleteSlide}
            disabled={isRefining}
            style={{ padding: '6px 10px', borderRadius: '8px', color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.4)' }}
            title="Hapus Slide Ini"
          >
            <Trash2 size={14} />
          </button>

          {/* Gini Aja (Selesai) Button */}
          <button
            type="button"
            className="btn-primary"
            onClick={onDoneEditing}
            style={{ padding: '6px 14px', fontSize: '0.82rem', borderRadius: '8px' }}
            title="Simpan kustomisasi dan kembali ke tampilan deck"
          >
            <Check size={14} />
            <span>Gini Aja (Selesai)</span>
          </button>
        </div>
      </div>

      {/* Main Slide Editor Stage Container */}
      <div className="slide-stage-container animate-slide" style={{ position: 'relative' }}>
        {/* Editing indicator pill */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            background: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            padding: '2px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase'
          }}
        >
          ✏️ Mode Edit Langsung (Klik teks untuk mengubah)
        </div>

        {/* Slide Header (for non-hero slides) */}
        {slide.layout !== 'hero' && (
          <div style={{ marginBottom: '1.75rem' }}>
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
                • Slide {slide.slideNumber}
              </span>
            </div>

            {/* Editable Title */}
            <input
              type="text"
              value={slide.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Judul Slide (Action Headline)..."
              style={{
                width: '100%',
                fontSize: '1.85rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px dashed var(--border-card)',
                borderRadius: '8px',
                padding: '6px 10px',
                outline: 'none',
                marginBottom: '6px'
              }}
            />

            {/* Editable Subtitle */}
            <input
              type="text"
              value={slide.subtitle || ''}
              onChange={(e) => handleSubtitleChange(e.target.value)}
              placeholder="Subjudul atau konteks pendukung..."
              style={{
                width: '100%',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px dashed var(--border-card)',
                borderRadius: '6px',
                padding: '4px 8px',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* Slide Layout Editable Body */}
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

        {/* Slide Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '1rem',
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
    </div>
  );
};

// 1. Editable Hero Layout
const EditableHeroLayout: React.FC<{
  content: HeroContent;
  title: string;
  onTitleChange: (val: string) => void;
  onContentChange: (newContent: HeroContent) => void;
}> = ({ content, title, onTitleChange, onContentChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      {/* Badge */}
      <input
        type="text"
        value={content.badge || 'EXECUTIVE BRIEFING'}
        onChange={(e) => onContentChange({ ...content, badge: e.target.value })}
        style={{
          width: 'fit-content',
          padding: '4px 12px',
          borderRadius: '20px',
          background: 'var(--badge-bg)',
          color: 'var(--badge-text)',
          fontSize: '0.8rem',
          fontWeight: 700,
          border: '1px solid var(--accent)',
          outline: 'none'
        }}
      />

      {/* Main Headline */}
      <textarea
        value={content.headline || title}
        onChange={(e) => {
          onTitleChange(e.target.value);
          onContentChange({ ...content, headline: e.target.value });
        }}
        rows={2}
        placeholder="Hero Headline (Grand Statement)..."
        style={{
          width: '100%',
          fontSize: '2.5rem',
          fontWeight: 900,
          color: 'var(--text-primary)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px dashed var(--border-card)',
          borderRadius: '12px',
          padding: '10px',
          outline: 'none',
          resize: 'none'
        }}
      />

      {/* Subheadline */}
      <textarea
        value={content.subheadline || ''}
        onChange={(e) => onContentChange({ ...content, subheadline: e.target.value })}
        rows={2}
        placeholder="Subheadline atau proposisi nilai..."
        style={{
          width: '100%',
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px dashed var(--border-card)',
          borderRadius: '8px',
          padding: '8px',
          outline: 'none',
          resize: 'none'
        }}
      />

      {/* Author */}
      <input
        type="text"
        value={content.author || ''}
        onChange={(e) => onContentChange({ ...content, author: e.target.value })}
        placeholder="Nama Presenter / Tim..."
        style={{
          width: 'fit-content',
          fontSize: '0.9rem',
          color: 'var(--accent)',
          fontWeight: 600,
          background: 'transparent',
          border: '1px dashed var(--border-card)',
          borderRadius: '6px',
          padding: '4px 8px',
          outline: 'none'
        }}
      />
    </div>
  );
};

// 2. Editable Cards Layout
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
        { title: 'Poin Baru', description: 'Deskripsi ringkas dan padat untuk poin baru ini.', iconName: 'sparkles' }
      ]
    });
  };

  return (
    <div>
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
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px dashed var(--border-card)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {/* Delete card button if more than 2 */}
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
                  color: '#F87171',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
                title="Hapus Kartu Ini"
              >
                ✕
              </button>
            )}

            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'var(--badge-bg)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem'
              }}
            >
              {getIcon(card.iconName)}
            </div>

            <input
              type="text"
              value={card.title}
              onChange={(e) => updateCard(idx, 'title', e.target.value)}
              placeholder="Judul Kartu..."
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-card)',
                borderRadius: '6px',
                padding: '4px 8px',
                outline: 'none',
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
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-card)',
                borderRadius: '6px',
                padding: '6px',
                outline: 'none',
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
            border: '1px dashed var(--accent)',
            color: 'var(--accent)',
            borderRadius: '8px',
            padding: '4px 12px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Plus size={14} /> Tambah Kolom Kartu
        </button>
      )}
    </div>
  );
};

// 3. Editable Stats Layout
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
        gap: '1.25rem',
        width: '100%'
      }}
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px dashed var(--border-card)',
            borderRadius: '16px',
            padding: '1.5rem 1rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {/* Editable Big Metric */}
          <input
            type="text"
            value={stat.value}
            onChange={(e) => updateStat(idx, 'value', e.target.value)}
            placeholder="85%+"
            style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              fontFamily: 'Outfit, sans-serif',
              color: 'var(--accent)',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-card)',
              borderRadius: '8px',
              padding: '2px',
              outline: 'none'
            }}
          />

          {/* Editable Label */}
          <input
            type="text"
            value={stat.label}
            onChange={(e) => updateStat(idx, 'label', e.target.value)}
            placeholder="Label Metrik..."
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-card)',
              borderRadius: '6px',
              padding: '4px',
              outline: 'none'
            }}
          />

          {/* Editable Description */}
          <textarea
            value={stat.description}
            onChange={(e) => updateStat(idx, 'description', e.target.value)}
            rows={2}
            placeholder="Konteks metrik..."
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              background: 'transparent',
              border: '1px solid var(--border-card)',
              borderRadius: '6px',
              padding: '4px',
              outline: 'none',
              resize: 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
};

// 4. Editable Timeline Layout
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
        gap: '1rem',
        width: '100%'
      }}
    >
      {steps.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px dashed var(--border-card)',
            borderRadius: '12px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {/* Step Number */}
          <input
            type="text"
            value={item.step}
            onChange={(e) => updateStep(idx, 'step', e.target.value)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--accent)',
              color: '#050810',
              textAlign: 'center',
              fontWeight: 800,
              border: 'none',
              outline: 'none'
            }}
          />

          {/* Title */}
          <input
            type="text"
            value={item.title}
            onChange={(e) => updateStep(idx, 'title', e.target.value)}
            placeholder="Nama Tahap..."
            style={{
              width: '100%',
              fontSize: '0.9rem',
              fontWeight: 700,
              textAlign: 'center',
              color: 'var(--text-primary)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-card)',
              borderRadius: '6px',
              padding: '4px',
              outline: 'none'
            }}
          />

          {/* Description */}
          <textarea
            value={item.description}
            onChange={(e) => updateStep(idx, 'description', e.target.value)}
            rows={3}
            placeholder="Deskripsi langkah..."
            style={{
              width: '100%',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              background: 'transparent',
              border: '1px solid var(--border-card)',
              borderRadius: '6px',
              padding: '4px',
              outline: 'none',
              resize: 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
};

// 5. Editable Callout Layout
const EditableCalloutLayout: React.FC<{
  content: CalloutContent;
  onContentChange: (newContent: CalloutContent) => void;
}> = ({ content, onContentChange }) => {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px dashed var(--border-card)',
        borderLeft: '5px solid var(--accent)',
        borderRadius: '16px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Badge */}
      <input
        type="text"
        value={content.highlightBadge || 'KESIMPULAN UTAMA'}
        onChange={(e) => onContentChange({ ...content, highlightBadge: e.target.value })}
        style={{
          width: 'fit-content',
          padding: '4px 10px',
          borderRadius: '6px',
          background: 'var(--badge-bg)',
          color: 'var(--badge-text)',
          fontSize: '0.75rem',
          fontWeight: 800,
          border: '1px solid var(--accent)',
          outline: 'none'
        }}
      />

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <Quote size={32} style={{ color: 'var(--accent)', flexShrink: 0, opacity: 0.8 }} />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Quote text */}
          <textarea
            value={content.quoteText}
            onChange={(e) => onContentChange({ ...content, quoteText: e.target.value })}
            rows={3}
            placeholder="Kutipan atau tesis utama..."
            style={{
              width: '100%',
              fontSize: '1.4rem',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-card)',
              borderRadius: '8px',
              padding: '8px',
              outline: 'none',
              resize: 'none'
            }}
          />

          {/* Explanation */}
          <textarea
            value={content.explanation}
            onChange={(e) => onContentChange({ ...content, explanation: e.target.value })}
            rows={2}
            placeholder="Penjelasan konteks atau implikasi..."
            style={{
              width: '100%',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              background: 'transparent',
              border: '1px solid var(--border-card)',
              borderRadius: '6px',
              padding: '6px',
              outline: 'none',
              resize: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};
