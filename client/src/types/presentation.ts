import { z } from 'zod';

export const ThemeSchema = z.enum([
  'dark_modern',
  'cyberpunk',
  'corporate_blue',
  'minimal_light'
]);
export type PresentationTheme = z.infer<typeof ThemeSchema>;

// Layout 1: Hero
export const HeroContentSchema = z.object({
  headline: z.string().describe('Compelling, action-oriented headline (max 8-10 words)'),
  subheadline: z.string().describe('Clear value statement (1-2 sentences)'),
  badge: z.string().optional().describe('Category or topic pill tag'),
  author: z.string().optional().describe('Presenter or organization note'),
  keyHighlights: z.array(z.string()).optional().describe('2-3 punchy topic-specific bullet chips'),
  visualConcept: z.object({
    badge: z.string().optional().describe('Badge for the visual card, e.g. "DIAGRAM ALUR", "METRIK KUNCI", "MODEL KERJA"'),
    nodes: z.array(z.string()).optional().describe('3-4 connected concept words tailored to the topic'),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string()
    })).optional().describe('1-2 key showcase metrics tailored to the topic')
  }).optional().describe('Visual diagram or showcase data tailored to the topic')
});
export type HeroContent = z.infer<typeof HeroContentSchema>;

// Layout 2: Cards
export const CardItemSchema = z.object({
  title: z.string().describe('Sharp card title (2-5 words)'),
  description: z.string().describe('Concise insight (max 15 words)'),
  iconName: z.string().optional().describe('Semantic icon keyword like rocket, shield, cpu, zap, bar-chart, users, heart, coffee, shopping-bag, book, check, target, star, globe'),
  badge: z.string().optional().describe('Pill badge on top of card e.g. "PILAR 01", "METODE A", "TAHAP 1"'),
  highlight: z.string().optional().describe('Concrete highlight or metric chip at bottom e.g. "✦ Menghemat 30 Jam/Bulan", "✦ Bebas Efek Samping"'),
  colorVariant: z.enum(['violet', 'blue', 'emerald', 'amber', 'rose', 'cyan']).optional().describe('Color accent personality for this card')
});
export type CardItem = z.infer<typeof CardItemSchema>;

export const CardsContentSchema = z.object({
  cards: z.array(CardItemSchema).min(2).max(4).describe('2 to 4 structured feature or insight cards')
});
export type CardsContent = z.infer<typeof CardsContentSchema>;

// Layout 3: Stats
export const StatItemSchema = z.object({
  value: z.string().describe('Punchy metric like "85%+", "3.4x", "<10ms", "$1.2B", "12.000+"'),
  label: z.string().describe('Concise label for the metric (2-4 words)'),
  description: z.string().describe('Context or impact explanation (under 12 words)'),
  category: z.string().optional().describe('Category tag above the stat, e.g. "PERFORMA", "FINANSIAL", "KEPUASAN"'),
  trend: z.string().optional().describe('Trend chip e.g. "▲ +45% YoY", "▼ Efisiensi Biaya", "✔ Rekor Tertinggi"'),
  progressPercent: z.number().min(0).max(100).optional().describe('Benchmark percentage for visual progress bar (0-100)')
});
export type StatItem = z.infer<typeof StatItemSchema>;

export const StatsContentSchema = z.object({
  stats: z.array(StatItemSchema).min(2).max(4).describe('2 to 4 high-impact statistical metrics')
});
export type StatsContent = z.infer<typeof StatsContentSchema>;

// Layout 4: Timeline
export const TimelineStepSchema = z.object({
  step: z.string().describe('Step indicator like "01", "Phase 1", "Step 1"'),
  title: z.string().describe('Phase or milestone name (2-5 words)'),
  description: z.string().describe('Execution goal or milestone deliverable (max 15 words)'),
  status: z.string().optional().describe('Phase status label e.g. "SELESAI", "SEDANG BERJALAN", "TARGET Q4", "FASE 1"'),
  deliverables: z.array(z.string()).optional().describe('1-3 concrete deliverables / bullet points specific to this milestone')
});
export type TimelineStep = z.infer<typeof TimelineStepSchema>;

export const TimelineContentSchema = z.object({
  steps: z.array(TimelineStepSchema).min(3).max(5).describe('3 to 5 linear roadmap milestones')
});
export type TimelineContent = z.infer<typeof TimelineContentSchema>;

// Layout 5: Callout
export const CalloutActionItemSchema = z.object({
  title: z.string().describe('Action heading e.g. "Prioritas Hari Ini"'),
  description: z.string().describe('Action detail e.g. "Audit pipeline dan alur kerja"'),
  tag: z.string().optional().describe('Short tag or badge e.g. "SEGERA", "Q4 TARGET"')
});
export type CalloutActionItem = z.infer<typeof CalloutActionItemSchema>;

export const CalloutContentSchema = z.object({
  quoteText: z.string().describe('High-impact key thesis or memorable quote'),
  highlightBadge: z.string().optional().describe('Takeaway badge like "KEY TAKEAWAY", "CORE PRINCIPLE", "KESIMPULAN"'),
  explanation: z.string().describe('Supporting context or actionable implication'),
  actionItems: z.array(CalloutActionItemSchema).optional().describe('1-2 key takeaway or strategic action boxes')
});
export type CalloutContent = z.infer<typeof CalloutContentSchema>;

// Layout 6: Comparison (New: Before vs After / Problem vs Solution)
export const ComparisonSideSchema = z.object({
  tag: z.string().describe('Category badge e.g. "MODEL KONVENSIONAL", "TANTANGAN LAMA"'),
  title: z.string().describe('Title of this side'),
  points: z.array(z.string()).min(2).max(4).describe('2-4 bullet points or characteristics'),
  badge: z.string().optional().describe('Badge like "SEBELUM" or "SESUDAH"'),
  highlight: z.string().optional().describe('Bottom punchy conclusion')
});
export type ComparisonSide = z.infer<typeof ComparisonSideSchema>;

export const ComparisonContentSchema = z.object({
  leftSide: ComparisonSideSchema.describe('Left side: Problem, Conventional, or Before'),
  rightSide: ComparisonSideSchema.describe('Right side: Solution, Modern, or After')
});
export type ComparisonContent = z.infer<typeof ComparisonContentSchema>;

// Unified Slide Schema with Dynamic Layout Variants
export const SlideSchema = z.object({
  id: z.string().describe('Unique slide ID, e.g. "slide-1"'),
  slideNumber: z.number().int().positive(),
  layout: z.enum(['hero', 'cards', 'stats', 'timeline', 'callout', 'comparison']),
  layoutVariant: z.enum([
    'default',
    'split_showcase',
    'centered_display',
    'editorial_minimal',
    'bento_featured',
    'grid_3',
    'grid_2_detailed',
    'dashboard_3',
    'giant_highlight',
    'horizontal_roadmap',
    'vertical_steps',
    'quote_matrix',
    'key_takeaways'
  ]).optional().describe('Visual design layout variant chosen automatically by AI to ensure every slide has a distinct design'),
  eyebrow: z.string().optional().describe('Gamma-style uppercase section/category indicator'),
  title: z.string().describe('Action-oriented slide headline'),
  subtitle: z.string().optional().describe('Supporting subtext or context'),
  speakerNotes: z.string().optional().describe('Actionable presenter notes or speaking cues for this slide'),
  accentColor: z.string().optional().describe('Optional theme tone override for this slide (violet, blue, emerald, amber, rose)'),
  content: z.union([
    HeroContentSchema,
    CardsContentSchema,
    StatsContentSchema,
    TimelineContentSchema,
    CalloutContentSchema,
    ComparisonContentSchema
  ])
});
export type Slide = z.infer<typeof SlideSchema>;

// Full Presentation Deck Schema
export const PresentationDeckSchema = z.object({
  title: z.string().describe('Title of the overall presentation deck'),
  description: z.string().optional().describe('Brief abstract of the presentation'),
  theme: ThemeSchema.default('dark_modern'),
  slides: z.array(SlideSchema).min(1).max(15)
});
export type PresentationDeck = z.infer<typeof PresentationDeckSchema>;
