import pptxgen from 'pptxgenjs';
import {
  PresentationDeck,
  Slide,
  HeroContent,
  CardsContent,
  StatsContent,
  TimelineContent,
  CalloutContent
} from '../types/presentation.js';
import { getTheme, ThemePalette } from '../themes/colorPalettes.js';

// Slide 16:9 Dimensions in Inches
const SLIDE_WIDTH = 10.0;
const SLIDE_HEIGHT = 5.625;
const MARGIN_LEFT = 0.8;
const CONTENT_WIDTH = SLIDE_WIDTH - MARGIN_LEFT * 2; // 8.4 inches

export async function exportToPPTX(deck: PresentationDeck): Promise<Buffer> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pptx = new (pptxgen as any)();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'PPT-AI-Generator';
  pptx.title = deck.title;

  const theme: ThemePalette = getTheme(deck.theme);

  // Render each slide
  for (const slideData of deck.slides) {
    const slide = pptx.addSlide();
    slide.background = { color: theme.background };

    // Header bar (Title & Subtitle) - skipped for 'hero' layout
    if (slideData.layout !== 'hero') {
      renderStandardHeader(slide, slideData, theme, pptx);
    }

    // Render layout specific elements
    switch (slideData.layout) {
      case 'hero':
        renderHeroLayout(slide, slideData, theme, pptx);
        break;
      case 'cards':
        renderCardsLayout(slide, slideData, theme, pptx);
        break;
      case 'stats':
        renderStatsLayout(slide, slideData, theme, pptx);
        break;
      case 'timeline':
        renderTimelineLayout(slide, slideData, theme, pptx);
        break;
      case 'callout':
        renderCalloutLayout(slide, slideData, theme, pptx);
        break;
    }

    // Footer indicator (Slide Number & Deck Title)
    renderFooter(slide, slideData, deck.title, theme);
  }

  const output = await pptx.write({ outputType: 'nodebuffer' });
  return output as Buffer;
}

/**
 * Standard Header for content slides
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderStandardHeader(slide: any, slideData: Slide, theme: ThemePalette, pptx: any) {
  // Category Pill / Layout Indicator
  slide.addShape(pptx.ShapeType.roundRect, {
    x: MARGIN_LEFT,
    y: 0.5,
    w: 1.6,
    h: 0.32,
    rectRadius: 0.1,
    fill: { color: theme.badgeBg },
    line: { color: theme.accent, width: 0.5 }
  });

  slide.addText(slideData.layout.toUpperCase(), {
    x: MARGIN_LEFT,
    y: 0.5,
    w: 1.6,
    h: 0.32,
    fontSize: 9,
    fontFace: 'Arial',
    bold: true,
    color: theme.badgeText,
    align: 'center',
    valign: 'middle'
  });

  // Action Title
  slide.addText(slideData.title, {
    x: MARGIN_LEFT,
    y: 0.9,
    w: CONTENT_WIDTH,
    h: 0.55,
    fontSize: 22,
    fontFace: 'Arial',
    bold: true,
    color: theme.textPrimary,
    valign: 'top'
  });

  // Subtitle
  if (slideData.subtitle) {
    slide.addText(slideData.subtitle, {
      x: MARGIN_LEFT,
      y: 1.45,
      w: CONTENT_WIDTH,
      h: 0.35,
      fontSize: 13,
      fontFace: 'Arial',
      color: theme.textSecondary,
      valign: 'top'
    });
  }
}

/**
 * 1. Hero Layout Renderer
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderHeroLayout(slide: any, slideData: Slide, theme: ThemePalette, pptx: any) {
  const content = slideData.content as HeroContent;

  // Background accent container card
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 0.8,
    w: 8.0,
    h: 3.8,
    rectRadius: 0.25,
    fill: { color: theme.cardBg },
    line: { color: theme.cardBorder, width: 1.5 }
  });

  // Category Badge
  const badgeText = content.badge || 'EXECUTIVE BRIEFING';
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.4,
    y: 1.2,
    w: 2.2,
    h: 0.35,
    rectRadius: 0.1,
    fill: { color: theme.badgeBg },
    line: { color: theme.accent, width: 1 }
  });

  slide.addText(badgeText.toUpperCase(), {
    x: 1.4,
    y: 1.2,
    w: 2.2,
    h: 0.35,
    fontSize: 10,
    fontFace: 'Arial',
    bold: true,
    color: theme.badgeText,
    align: 'center',
    valign: 'middle'
  });

  // Headline
  slide.addText(content.headline || slideData.title, {
    x: 1.4,
    y: 1.7,
    w: 7.2,
    h: 1.4,
    fontSize: 32,
    fontFace: 'Arial',
    bold: true,
    color: theme.textPrimary,
    valign: 'top'
  });

  // Subheadline
  slide.addText(content.subheadline || slideData.subtitle || '', {
    x: 1.4,
    y: 3.1,
    w: 7.2,
    h: 0.8,
    fontSize: 16,
    fontFace: 'Arial',
    color: theme.textSecondary,
    valign: 'top'
  });

  // Author / Note
  if (content.author) {
    slide.addText(content.author, {
      x: 1.4,
      y: 4.0,
      w: 7.2,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Arial',
      color: theme.accent,
      bold: true
    });
  }
}

/**
 * 2. Cards Layout Renderer (2, 3, or 4 columns)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCardsLayout(slide: any, slideData: Slide, theme: ThemePalette, pptx: any) {
  const content = slideData.content as CardsContent;
  const cards = content.cards || [];
  const count = Math.min(Math.max(cards.length, 1), 4);

  const startY = 2.0;
  const cardHeight = 2.8;
  const gap = 0.3;
  const totalGaps = (count - 1) * gap;
  const cardWidth = (CONTENT_WIDTH - totalGaps) / count;

  cards.slice(0, count).forEach((card, index) => {
    const cardX = MARGIN_LEFT + index * (cardWidth + gap);

    // Card Container
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cardX,
      y: startY,
      w: cardWidth,
      h: cardHeight,
      rectRadius: 0.15,
      fill: { color: theme.cardBg },
      line: { color: theme.cardBorder, width: 1 }
    });

    // Top Accent Stripe
    slide.addShape(pptx.ShapeType.rect, {
      x: cardX + 0.3,
      y: startY + 0.3,
      w: 0.8,
      h: 0.08,
      fill: { color: theme.accent }
    });

    // Card Title
    slide.addText(card.title, {
      x: cardX + 0.3,
      y: startY + 0.55,
      w: cardWidth - 0.6,
      h: 0.65,
      fontSize: 17,
      fontFace: 'Arial',
      bold: true,
      color: theme.textPrimary,
      valign: 'top'
    });

    // Card Description
    slide.addText(card.description, {
      x: cardX + 0.3,
      y: startY + 1.25,
      w: cardWidth - 0.6,
      h: 1.3,
      fontSize: 13,
      fontFace: 'Arial',
      color: theme.textSecondary,
      valign: 'top'
    });
  });
}

/**
 * 3. Stats Layout Renderer
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderStatsLayout(slide: any, slideData: Slide, theme: ThemePalette, pptx: any) {
  const content = slideData.content as StatsContent;
  const stats = content.stats || [];
  const count = Math.min(Math.max(stats.length, 1), 4);

  const startY = 2.0;
  const cardHeight = 2.8;
  const gap = 0.3;
  const totalGaps = (count - 1) * gap;
  const cardWidth = (CONTENT_WIDTH - totalGaps) / count;

  stats.slice(0, count).forEach((stat, index) => {
    const cardX = MARGIN_LEFT + index * (cardWidth + gap);

    // Card Container
    slide.addShape(pptx.ShapeType.roundRect, {
      x: cardX,
      y: startY,
      w: cardWidth,
      h: cardHeight,
      rectRadius: 0.15,
      fill: { color: theme.cardBg },
      line: { color: theme.cardBorder, width: 1.2 }
    });

    // Big Metric Number
    slide.addText(stat.value, {
      x: cardX + 0.2,
      y: startY + 0.3,
      w: cardWidth - 0.4,
      h: 0.9,
      fontSize: 40,
      fontFace: 'Arial',
      bold: true,
      color: theme.accent,
      align: 'center',
      valign: 'middle'
    });

    // Metric Label
    slide.addText(stat.label, {
      x: cardX + 0.25,
      y: startY + 1.25,
      w: cardWidth - 0.5,
      h: 0.45,
      fontSize: 15,
      fontFace: 'Arial',
      bold: true,
      color: theme.textPrimary,
      align: 'center',
      valign: 'top'
    });

    // Description
    slide.addText(stat.description, {
      x: cardX + 0.25,
      y: startY + 1.75,
      w: cardWidth - 0.5,
      h: 0.8,
      fontSize: 12,
      fontFace: 'Arial',
      color: theme.textSecondary,
      align: 'center',
      valign: 'top'
    });
  });
}

/**
 * 4. Timeline Layout Renderer
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderTimelineLayout(slide: any, slideData: Slide, theme: ThemePalette, pptx: any) {
  const content = slideData.content as TimelineContent;
  const steps = content.steps || [];
  const count = Math.min(Math.max(steps.length, 1), 5);

  const startY = 2.2;
  const cardHeight = 2.5;
  const gap = 0.25;
  const totalGaps = (count - 1) * gap;
  const colWidth = (CONTENT_WIDTH - totalGaps) / count;

  // Background connecting line
  slide.addShape(pptx.ShapeType.line, {
    x: MARGIN_LEFT + colWidth / 2,
    y: startY + 0.3,
    w: CONTENT_WIDTH - colWidth,
    h: 0,
    line: { color: theme.cardBorder, width: 2 }
  });

  steps.slice(0, count).forEach((item, index) => {
    const colX = MARGIN_LEFT + index * (colWidth + gap);

    // Step Number Node
    slide.addShape(pptx.ShapeType.ellipse, {
      x: colX + colWidth / 2 - 0.3,
      y: startY,
      w: 0.6,
      h: 0.6,
      fill: { color: theme.accent },
      line: { color: theme.cardBg, width: 2 }
    });

    slide.addText(item.step, {
      x: colX + colWidth / 2 - 0.3,
      y: startY,
      w: 0.6,
      h: 0.6,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: theme.background,
      align: 'center',
      valign: 'middle'
    });

    // Milestone Card Box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: colX,
      y: startY + 0.8,
      w: colWidth,
      h: cardHeight - 0.8,
      rectRadius: 0.1,
      fill: { color: theme.cardBg },
      line: { color: theme.cardBorder, width: 1 }
    });

    // Milestone Title
    slide.addText(item.title, {
      x: colX + 0.15,
      y: startY + 0.95,
      w: colWidth - 0.3,
      h: 0.45,
      fontSize: 14,
      fontFace: 'Arial',
      bold: true,
      color: theme.textPrimary,
      valign: 'top'
    });

    // Milestone Description
    slide.addText(item.description, {
      x: colX + 0.15,
      y: startY + 1.45,
      w: colWidth - 0.3,
      h: 0.85,
      fontSize: 11,
      fontFace: 'Arial',
      color: theme.textSecondary,
      valign: 'top'
    });
  });
}

/**
 * 5. Callout Layout Renderer
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCalloutLayout(slide: any, slideData: Slide, theme: ThemePalette, pptx: any) {
  const content = slideData.content as CalloutContent;

  const boxY = 2.0;
  const boxHeight = 2.7;

  // Main Callout Container
  slide.addShape(pptx.ShapeType.roundRect, {
    x: MARGIN_LEFT,
    y: boxY,
    w: CONTENT_WIDTH,
    h: boxHeight,
    rectRadius: 0.18,
    fill: { color: theme.cardBg },
    line: { color: theme.cardBorder, width: 1.5 }
  });

  // Left Accent Bar
  slide.addShape(pptx.ShapeType.rect, {
    x: MARGIN_LEFT,
    y: boxY,
    w: 0.18,
    h: boxHeight,
    fill: { color: theme.accent }
  });

  // Highlight Badge
  const badge = content.highlightBadge || 'KEY TAKEAWAY';
  slide.addShape(pptx.ShapeType.roundRect, {
    x: MARGIN_LEFT + 0.5,
    y: boxY + 0.4,
    w: 1.8,
    h: 0.32,
    rectRadius: 0.08,
    fill: { color: theme.badgeBg }
  });

  slide.addText(badge.toUpperCase(), {
    x: MARGIN_LEFT + 0.5,
    y: boxY + 0.4,
    w: 1.8,
    h: 0.32,
    fontSize: 9,
    fontFace: 'Arial',
    bold: true,
    color: theme.badgeText,
    align: 'center',
    valign: 'middle'
  });

  // Quote Text
  slide.addText(`"${content.quoteText}"`, {
    x: MARGIN_LEFT + 0.5,
    y: boxY + 0.85,
    w: CONTENT_WIDTH - 1.0,
    h: 1.0,
    fontSize: 22,
    fontFace: 'Arial',
    bold: true,
    italic: true,
    color: theme.textPrimary,
    valign: 'top'
  });

  // Explanation
  slide.addText(content.explanation, {
    x: MARGIN_LEFT + 0.5,
    y: boxY + 1.9,
    w: CONTENT_WIDTH - 1.0,
    h: 0.65,
    fontSize: 14,
    fontFace: 'Arial',
    color: theme.textSecondary,
    valign: 'top'
  });
}

/**
 * Slide Footer Indicator
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderFooter(slide: any, slideData: Slide, deckTitle: string, theme: ThemePalette) {
  // Slide Number Pill
  slide.addText(`${slideData.slideNumber}`, {
    x: SLIDE_WIDTH - 1.2,
    y: SLIDE_HEIGHT - 0.45,
    w: 0.5,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    bold: true,
    color: theme.textSecondary,
    align: 'right'
  });

  // Presentation Title Watermark
  slide.addText(deckTitle, {
    x: MARGIN_LEFT,
    y: SLIDE_HEIGHT - 0.45,
    w: 5.0,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: theme.textSecondary
  });
}
