import type { SectionKey } from '@/types';

/** Element ids of the landing page sections (anchors for navigation and active-state tracking). */
export const SECTION_IDS = {
  program: 'sta-dobijas',
  process: 'kako-funkcionise',
  lessons: 'lekcije',
  about: 'o-nama',
  results: 'rezultati',
  pricing: 'cenovnik',
  faq: 'faq',
} as const satisfies Record<SectionKey, string>;

/**
 * Whether the FAQ section (and its header and footer links) is shown.
 * Temporarily hidden until the client delivers the FAQ content — set to `true` to bring it back.
 */
export const SHOW_FAQ = false;

/** Sections linked from the header navigation, in page order (labels: nav.<key>). */
export const NAV_SECTIONS: readonly SectionKey[] = [
  'program',
  'process',
  'lessons',
  'about',
  'results',
  'pricing',
  ...(SHOW_FAQ ? (['faq'] as const) : []),
];

/** Element id of the contact column in the footer. */
export const FOOTER_CONTACT_ID = 'footer-kontakt';
