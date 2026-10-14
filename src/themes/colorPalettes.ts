import { PresentationTheme } from '../types/presentation.js';

export interface ThemePalette {
  name: string;
  background: string;     // Hex without # for pptxgenjs, with # for CSS
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentSecondary: string;
  badgeBg: string;
  badgeText: string;
}

export const THEME_PALETTES: Record<PresentationTheme, ThemePalette> = {
  dark_modern: {
    name: 'Dark Modern',
    background: '0F172A', // Slate 900
    cardBg: '1E293B',     // Slate 800
    cardBorder: '334155', // Slate 700
    textPrimary: 'F8FAFC',
    textSecondary: '94A3B8',
    accent: '06B6D4',      // Cyan 500
    accentSecondary: '38BDF8',
    badgeBg: '164E63',
    badgeText: '22D3EE'
  },
  cyberpunk: {
    name: 'Cyberpunk Neon',
    background: '09090B', // Zinc 950
    cardBg: '18181B',     // Zinc 900
    cardBorder: '27272A',
    textPrimary: 'FAFAFA',
    textSecondary: 'A1A1AA',
    accent: '10B981',      // Emerald 500
    accentSecondary: 'A855F7', // Purple 500
    badgeBg: '064E3B',
    badgeText: '34D399'
  },
  corporate_blue: {
    name: 'Corporate Royal',
    background: '0A192F', // Deep Navy
    cardBg: '112240',
    cardBorder: '233554',
    textPrimary: 'E6F1FF',
    textSecondary: '8892B0',
    accent: '2563EB',      // Royal Blue
    accentSecondary: '64FFDA',
    badgeBg: '1E3A8A',
    badgeText: '93C5FD'
  },
  minimal_light: {
    name: 'Minimal Light',
    background: 'F8FAFC', // Slate 50
    cardBg: 'FFFFFF',
    cardBorder: 'E2E8F0',
    textPrimary: '0F172A',
    textSecondary: '64748B',
    accent: 'EA580C',      // Orange 600
    accentSecondary: '0284C7',
    badgeBg: 'FFEDD5',
    badgeText: 'C2410C'
  }
};

export function getTheme(themeName?: string): ThemePalette {
  if (themeName && themeName in THEME_PALETTES) {
    return THEME_PALETTES[themeName as PresentationTheme];
  }
  return THEME_PALETTES.dark_modern;
}
