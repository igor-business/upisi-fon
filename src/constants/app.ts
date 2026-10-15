import { ROUTES } from './route';
import type { LessonGroup, PricingTier, ProductConfig, ProductFeature, ProductId } from '@/types/common';

/** Default language used on first load. */
export const DEFAULT_LANGUAGE = 'sr' as const;

/** Paths to static images (files served from the public folder). */
export const IMAGES = {
  logo: '/logo.svg',
  hero: '/images/hero.webp',
  binaryBioskop: '/images/binary-bioskop.webp',
  teacher: '/images/daliborka-vujic.webp',
  founder: '/images/bojan-martinovic.webp',
  programLessons: '/images/program-lessons.webp',
  programExams: '/images/program-exams.webp',
  programMentor: '/images/program-mentor.webp',
} as const;

/** Intrinsic size of the hero image (prevents layout shift while loading). */
export const HERO_IMAGE_SIZE = { width: 1170, height: 780 } as const;

/** Ids of the landing page sections (anchors for navigation, footer links and active-state tracking). */
export const SECTION_IDS = {
  program: 'sta-dobijas',
  process: 'kako-funkcionise',
  lessons: 'lekcije',
  about: 'o-nama',
  results: 'rezultati',
  pricing: 'cenovnik',
  faq: 'faq',
  contact: 'kontakt',
} as const;

/** Illustrations of the program cards, in card order. */
export const PROGRAM_CARD_IMAGES = [
  IMAGES.programLessons,
  IMAGES.programExams,
  IMAGES.programMentor,
] as const;

/** Intrinsic size of the program card illustrations (prevents layout shift while loading). */
export const PROGRAM_CARD_IMAGE_SIZE = { width: 512, height: 512 } as const;

/** A header navigation item. */
export interface NavItem {
  /** Item number, used to build the translation key landing.nav.N. */
  index: number;
  /** Id of the section the item scrolls to. */
  target: string;
  /** Ids of other sections that keep this item highlighted while they are in view. */
  covers?: readonly string[];
}

/** Header navigation items in display order (same order as the sections on the page). */
export const NAV_ITEMS: readonly NavItem[] = [
  { index: 1, target: SECTION_IDS.program }, // Šta dobijaš
  { index: 2, target: SECTION_IDS.process }, // Kako funkcioniše
  { index: 3, target: SECTION_IDS.lessons }, // Lekcije
  { index: 4, target: SECTION_IDS.about }, // O nama
  { index: 5, target: SECTION_IDS.results }, // Rezultati
  { index: 6, target: SECTION_IDS.pricing }, // Cenovnik
  { index: 7, target: SECTION_IDS.faq }, // FAQ
  { index: 8, target: SECTION_IDS.contact }, // Kontakt
];

/** Public website of Binary Bioskop. */
export const BINARY_BIOSKOP_URL = 'https://binarybioskop.com';

/** Contact details shown in the footer (placeholders until real data is provided). */
export const CONTACT = {
  phone: '+381 66 00 11 00',
  phoneHref: 'tel:+381660011000',
  email: 'binarybioskop@gmail.com',
  emailHref: 'mailto:binarybioskop@gmail.com',
} as const;

/** Social network links shown in the footer. */
export const SOCIAL_LINKS = [
  { key: 'instagram', href: 'https://www.instagram.com/upisifon.rs' },
] as const;

/** A footer link: scrolls to a landing section, opens a page of the site or an external site. */
export type FooterLink =
  | { kind: 'section'; key: string; target: string }
  | { kind: 'route'; key: string; to: string }
  | { kind: 'external'; key: string; href: string };

/** A footer navigation column. */
export interface FooterColumn {
  /** Translation key: footer.columns.<key>.title (links: footer.columns.<key>.items.<link key>). */
  key: 'preparation' | 'about' | 'support';
  links: readonly FooterLink[];
}

/** Footer navigation columns (names match the header navigation). */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    key: 'preparation',
    links: [
      { kind: 'section', key: '1', target: SECTION_IDS.program },
      { kind: 'section', key: '2', target: SECTION_IDS.process },
      { kind: 'section', key: '3', target: SECTION_IDS.lessons },
      { kind: 'section', key: '4', target: SECTION_IDS.pricing },
      { kind: 'route', key: '5', to: ROUTES.SUMMER_SCHOOL },
    ],
  },
  {
    key: 'about',
    links: [
      { kind: 'section', key: '1', target: SECTION_IDS.about },
      { kind: 'section', key: '2', target: SECTION_IDS.results },
      { kind: 'external', key: '3', href: BINARY_BIOSKOP_URL },
    ],
  },
  {
    key: 'support',
    links: [
      { kind: 'section', key: '1', target: SECTION_IDS.faq },
      { kind: 'section', key: '2', target: SECTION_IDS.contact },
      { kind: 'route', key: '3', to: ROUTES.PURCHASE },
    ],
  },
];

/** Number of statistics shown under the hero (hero.stats.N). */
export const HERO_STATS_COUNT = 4;

/** Minimum length of a contact form message. */
export const CONTACT_MESSAGE_MIN_LENGTH = 10;

/** Number of testimonials defined in the translations (testimonials.items.N). */
export const TESTIMONIALS_COUNT = 3;

/** Number of problem/solution cards in the program section (program.cards.N). */
export const PROGRAM_CARDS_COUNT = 3;

/** Number of checklist items on each program card (program.cards.N.items.M). */
export const PROGRAM_CARD_ITEMS_COUNT = 3;

/** Number of steps in the process section (process.steps.N). */
export const PROCESS_STEPS_COUNT = 6;

/** Groups of the free lessons in display order (titles: lessons.groups.<group>). */
export const LESSON_GROUPS: readonly LessonGroup[] = ['intro', 'numbers', 'polynomials'];

/**
 * The free lessons in display order. The Nth entry has its title and duration in
 * lessons.items.N (N starts at 1).
 */
export const LESSONS: readonly { id: string; group: LessonGroup }[] = [
  { id: 'yKSV0r1mNYI', group: 'intro' },
  { id: 'cWvbm5iTFyw', group: 'numbers' },
  { id: 'w-Plfi1zNpg', group: 'numbers' },
  { id: 'SIS2u48d1mM', group: 'numbers' },
  { id: 'd69k8H9iAKg', group: 'numbers' },
  { id: 'vUQYsHMWS0k', group: 'numbers' },
  { id: 'gF_HtNvA83c', group: 'numbers' },
  { id: '1CBCjGYlBJI', group: 'polynomials' },
  { id: 'Zy6iGVHvRis', group: 'polynomials' },
  { id: 'K7MsUQu6NNo', group: 'polynomials' },
  { id: 'uzwmXrOOho0', group: 'polynomials' },
];

/** Numbers (1-based) of the lessons shown on the landing page. */
export const FEATURED_LESSONS: readonly number[] = [1, 2, 8];

/** Intrinsic size of the Binary Bioskop logo (prevents layout shift while loading). */
/** Intrinsic size of the people photos (teacher and founder). */
export const MEMBER_PHOTO_SIZE = 480;

export const BINARY_BIOSKOP_LOGO_SIZE = { width: 250, height: 288 } as const;

/** Number of questions in the FAQ section (faq.items.N). */
export const FAQ_ITEMS_COUNT = 5;

/** Id of the pricing section (target of the header "buy" button). */
export const PRICING_SECTION_ID = SECTION_IDS.pricing;

/** All features a product can include, in display order (texts: pricing.features.*). */
export const PRODUCT_FEATURES: readonly ProductFeature[] = [
  'program',
  'videos',
  'mentor',
  'mockExams',
  'summerSchool',
];

/** Products that can be bought on the site. Prices are in RSD per person. */
export const PRODUCTS: Readonly<Record<ProductId, ProductConfig>> = {
  mockExams: {
    prices: { individual: 5000, group3: 4500, group5: 4000 },
    features: ['mentor', 'mockExams'],
  },
  summerSchool: {
    prices: { individual: 7000 },
    features: ['summerSchool'],
  },
  fullPrep: {
    prices: { individual: 33000, group3: 29500, group5: 26000 },
    features: ['program', 'videos', 'mentor', 'mockExams', 'summerSchool'],
    recommended: true,
  },
};

/** Order of the product cards in the pricing section (the recommended one is last). */
export const PRODUCT_ORDER: readonly ProductId[] = ['mockExams', 'summerSchool', 'fullPrep'];

/** Products shown as cards in the pricing section (Summer School has its own page). */
export const PRICING_CARD_ORDER: readonly ProductId[] = ['mockExams', 'fullPrep'];

/** Order of the pricing tiers in the tier switch. */
export const TIER_ORDER: readonly PricingTier[] = ['individual', 'group3', 'group5'];

/** Allowed number of students per tier. */
export const TIER_STUDENT_LIMITS: Readonly<Record<PricingTier, { min: number; max: number }>> = {
  individual: { min: 1, max: 1 },
  group3: { min: 3, max: 5 },
  group5: { min: 5, max: 30 },
};

/** Number of Summer School highlights on the purchase page (pricing.summerSchool.N). */
export const SUMMER_SCHOOL_HIGHLIGHTS_COUNT = 3;

/** URL values of the products on the purchase page (?program=...). */
export const PRODUCT_SLUGS: Readonly<Record<ProductId, string>> = {
  mockExams: 'probni-prijemni',
  summerSchool: 'summer-school',
  fullPrep: 'celokupna-priprema',
};

/** URL values of the pricing tiers on the purchase page (?nacin=...). */
export const TIER_SLUGS: Readonly<Record<PricingTier, string>> = {
  individual: 'individualno',
  group3: 'grupa-3',
  group5: 'grupa-5',
};
