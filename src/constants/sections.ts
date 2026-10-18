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

/** Sections linked from the header navigation, in page order (labels: nav.<key>). */
export const NAV_SECTIONS: readonly SectionKey[] = [
  'program',
  'process',
  'lessons',
  'about',
  'results',
  'pricing',
  'faq',
];

/** Element id of the contact column in the footer. */
export const FOOTER_CONTACT_ID = 'footer-kontakt';
