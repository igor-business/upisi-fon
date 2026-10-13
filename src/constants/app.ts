/** Default language used on first load. */
export const DEFAULT_LANGUAGE = 'sr' as const;

/** Paths to static images (files served from the public folder). */
export const IMAGES = {
  logo: '/logo.svg',
  hero: '/images/hero.webp',
  programSystem: '/images/complete-system-fon.webp',
  binaryBioskop: '/images/binary-bioskop.webp',
} as const;

/** Intrinsic size of the hero image (prevents layout shift while loading). */
export const HERO_IMAGE_SIZE = { width: 1536, height: 1024 } as const;

/** Intrinsic size of the program section image (prevents layout shift while loading). */
export const PROGRAM_IMAGE_SIZE = { width: 1536, height: 1024 } as const;

/** A header navigation item. */
export interface NavItem {
  /** Item number, used to build the translation key landing.nav.N. */
  index: number;
  /** Id of the section the item scrolls to (undefined while the section does not exist yet). */
  target?: string;
}

/** Header navigation items in display order (targets follow the order of sections on the page). */
export const NAV_ITEMS: readonly NavItem[] = [
  { index: 1, target: 'section-1' }, // Početna
  { index: 2, target: 'section-2' }, // Program
  { index: 3, target: 'section-4' }, // Rezultati
  { index: 4, target: 'section-5' }, // Kako funkcioniše
  { index: 5, target: 'section-6' }, // Lekcije
  { index: 6, target: 'section-7' }, // O nama
  { index: 7, target: 'section-10' }, // FAQ
];

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
      { key: '1', target: 'section-3' },
      { key: '2', target: 'section-3' },
      { key: '3', target: 'section-3' },
      { key: '4', target: 'section-6' },
    ],
  },
  {
    key: 'about',
    links: [
      { key: '1', target: 'section-7' },
      { key: '2', target: 'section-7' },
      { key: '3', target: 'section-7' },
    ],
  },
  {
    key: 'support',
    links: [
      { key: '1', target: 'section-10' },
      { key: '2', target: 'section-11' },
    ],
  },
];

/** Legal footer links (pages do not exist yet). */
export const LEGAL_LINKS = [
  { key: 'privacy', href: '#' },
  { key: 'terms', href: '#' },
  { key: 'cookies', href: '#' },
] as const;

/** Number of testimonials defined in the translations (testimonials.items.N). */
export const TESTIMONIALS_COUNT = 9;

/** Number of testimonials visible at once. */
export const TESTIMONIALS_PER_PAGE = 3;

/** Time (ms) after which the testimonials carousel moves to the next page. */
export const TESTIMONIALS_INTERVAL = 10_000;

/** Number of statistics shown next to the testimonials (testimonials.stats.N). */
export const TESTIMONIALS_STATS_COUNT = 4;

/** Number of checklist items in the program section (program.items.N). */
export const PROGRAM_ITEMS_COUNT = 6;

/** Number of steps in the process section (process.steps.N). */
export const PROCESS_STEPS_COUNT = 6;

/** YouTube video ids of the free lessons (titles are in lessons.items.N.title). */
export const LESSON_VIDEO_IDS = ['yKSV0r1mNYI', 'cWvbm5iTFyw', '1CBCjGYlBJI'] as const;

/** Intrinsic size of the Binary Bioskop logo (prevents layout shift while loading). */
export const BINARY_BIOSKOP_LOGO_SIZE = { width: 250, height: 288 } as const;

/** Number of statistics shown in the about section (about.stats.N). */
export const ABOUT_STATS_COUNT = 3;

/** Number of items in the mentor section (mentor.items.N). */
export const MENTOR_ITEMS_COUNT = 3;

/** Number of features listed in every pricing plan (pricing.features.N). */
export const PRICING_FEATURES_COUNT = 5;

/** A pricing plan definition (texts are in pricing.plans.N.*). */
export interface PricingPlanConfig {
  /** Plan number, used to build translation keys. */
  index: number;
  /** Whether the plan is highlighted as the most popular one. */
  highlighted: boolean;
  /** Whether the plan shows a saving line. */
  hasSaving: boolean;
}

/** Pricing plans in display order. */
export const PRICING_PLANS: readonly PricingPlanConfig[] = [
  { index: 1, highlighted: false, hasSaving: false },
  { index: 2, highlighted: true, hasSaving: true },
  { index: 3, highlighted: false, hasSaving: true },
];

/** Number of questions in the FAQ section (faq.items.N). */
export const FAQ_ITEMS_COUNT = 5;
