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
  author: z.string().optional().describe('Presenter or organization note')
});
export type HeroContent = z.infer<typeof HeroContentSchema>;

// Layout 2: Cards
export const CardItemSchema = z.object({
  title: z.string().describe('Sharp card title (2-5 words)'),
  description: z.string().describe('Concise insight (max 15 words)'),
  iconName: z.string().optional().describe('Semantic icon keyword like rocket, shield, cpu, zap, bar-chart, users'),
  accentColor: z.string().optional().describe('Optional hex color or accent marker')
});
export const CardsContentSchema = z.object({
  cards: z.array(CardItemSchema).min(2).max(4).describe('2 to 4 structured feature or insight cards')
});
export type CardsContent = z.infer<typeof CardsContentSchema>;

// Layout 3: Stats
export const StatItemSchema = z.object({
  value: z.string().describe('Punchy metric like "85%+", "3.4x", "<10ms", "$1.2B"'),
  label: z.string().describe('Concise label for the metric (2-4 words)'),
  description: z.string().describe('Context or impact explanation (under 12 words)')
});
export const StatsContentSchema = z.object({
  stats: z.array(StatItemSchema).min(2).max(4).describe('2 to 4 high-impact statistical metrics')
});
export type StatsContent = z.infer<typeof StatsContentSchema>;

// Layout 4: Timeline
export const TimelineStepSchema = z.object({
  step: z.string().describe('Step indicator like "01", "Phase 1", "Step 1"'),
  title: z.string().describe('Phase or milestone name (2-5 words)'),
  description: z.string().describe('Execution goal or milestone deliverable (max 15 words)')
});
export const TimelineContentSchema = z.object({
  steps: z.array(TimelineStepSchema).min(3).max(5).describe('3 to 5 linear roadmap milestones')
});
export type TimelineContent = z.infer<typeof TimelineContentSchema>;

// Layout 5: Callout
export const CalloutContentSchema = z.object({
  quoteText: z.string().describe('High-impact key thesis or memorable quote'),
  highlightBadge: z.string().optional().describe('Takeaway badge like "KEY TAKEAWAY", "CORE PRINCIPLE"'),
  explanation: z.string().describe('Supporting context or actionable implication')
});
export type CalloutContent = z.infer<typeof CalloutContentSchema>;

// Unified Slide Schema
export const SlideSchema = z.object({
  id: z.string().describe('Unique slide ID, e.g. "slide-1"'),
  slideNumber: z.number().int().positive(),
  layout: z.enum(['hero', 'cards', 'stats', 'timeline', 'callout']),
  title: z.string().describe('Action-oriented slide headline'),
  subtitle: z.string().optional().describe('Supporting subtext or context'),
  content: z.union([
    HeroContentSchema,
    CardsContentSchema,
    StatsContentSchema,
    TimelineContentSchema,
    CalloutContentSchema
  ])
});
export type Slide = z.infer<typeof SlideSchema>;

// Full Presentation Deck Schema
export const PresentationDeckSchema = z.object({
  title: z.string().describe('Title of the overall presentation deck'),
  description: z.string().optional().describe('Brief abstract of the presentation'),
  theme: ThemeSchema.default('dark_modern'),
  slides: z.array(SlideSchema).min(1).max(12)
});
export type PresentationDeck = z.infer<typeof PresentationDeckSchema>;
