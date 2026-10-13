/** Application version. */
export const APP_VERSION = '0.1.0';

/** Default language used on first load. */
export const DEFAULT_LANGUAGE = 'sr' as const;

/** All supported languages. */
export const SUPPORTED_LANGUAGES = ['sr'] as const;

/** Paths to static images (files served from the public folder). */
export const IMAGES = {
  logo: '/logo.svg',
  hero: '/images/hero.webp',
} as const;

/** Intrinsic size of the hero image (prevents layout shift while loading). */
export const HERO_IMAGE_SIZE = { width: 1536, height: 1024 } as const;

/** A single landing page section definition. */
export interface LandingSection {
  /** Element id used for smooth scrolling and active-state tracking. */
  id: string;
  /** Section number, used to build translation keys (landing.nav.N, landing.section.N.*). */
  index: number;
}

/** Landing page sections rendered in order. */
export const LANDING_SECTIONS: readonly LandingSection[] = Array.from({ length: 7 }, (_, i) => ({
  id: `section-${i + 1}`,
  index: i + 1,
}));

/** Contact details shown in the footer (placeholders until real data is provided). */
export const CONTACT = {
  phone: '+381 66 00 11 00',
  phoneHref: 'tel:+381660011000',
  email: 'kontakt@upisifon.rs',
  emailHref: 'mailto:kontakt@upisifon.rs',
} as const;

/** Social network links shown in the footer (placeholders until real URLs are provided). */
export const SOCIAL_LINKS = [
  { key: 'instagram', href: '#' },
  { key: 'linkedin', href: '#' },
  { key: 'youtube', href: '#' },
] as const;

/** A footer link that scrolls to a landing page section. */
export interface FooterLink {
  /** Translation key suffix: footer.columns.<column>.items.<key>. */
  key: string;
  /** Landing section id the link scrolls to. */
  target: string;
}

/** A footer navigation column. */
export interface FooterColumn {
  /** Translation key: footer.columns.<key>.title. */
  key: 'program' | 'about' | 'support';
  links: readonly FooterLink[];
}

/** Footer navigation columns (targets map to the current placeholder sections). */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    key: 'program',
    links: [
      { key: '1', target: 'section-2' },
      { key: '2', target: 'section-2' },
      { key: '3', target: 'section-2' },
      { key: '4', target: 'section-7' },
    ],
  },
  {
    key: 'about',
    links: [
      { key: '1', target: 'section-5' },
      { key: '2', target: 'section-5' },
      { key: '3', target: 'section-5' },
    ],
  },
  {
    key: 'support',
    links: [
      { key: '1', target: 'section-6' },
      { key: '2', target: 'section-7' },
    ],
  },
];

/** Legal footer links (pages do not exist yet). */
export const LEGAL_LINKS = [
  { key: 'privacy', href: '#' },
  { key: 'terms', href: '#' },
  { key: 'cookies', href: '#' },
] as const;
