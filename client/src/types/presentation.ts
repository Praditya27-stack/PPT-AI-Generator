export type PresentationTheme = 'dark_modern' | 'cyberpunk' | 'corporate_blue' | 'minimal_light';

export interface HeroContent {
  headline: string;
  subheadline: string;
  badge?: string;
  author?: string;
}

export interface CardItem {
  title: string;
  description: string;
  iconName?: string;
  accentColor?: string;
}

export interface CardsContent {
  cards: CardItem[];
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface StatsContent {
  stats: StatItem[];
}

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
}

export interface TimelineContent {
  steps: TimelineStep[];
}

export interface CalloutContent {
  quoteText: string;
  highlightBadge?: string;
  explanation: string;
}

export interface Slide {
  id: string;
  slideNumber: number;
  layout: 'hero' | 'cards' | 'stats' | 'timeline' | 'callout';
  eyebrow?: string;
  title: string;
  subtitle?: string;
  speakerNotes?: string;
  content: HeroContent | CardsContent | StatsContent | TimelineContent | CalloutContent;
}

export interface PresentationDeck {
  title: string;
  description?: string;
  theme: PresentationTheme;
  slides: Slide[];
}
