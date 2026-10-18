import type { FooterColumn } from '@/types';
import { BINARY_BIOSKOP_URL } from './company';
import { ROUTES } from './routes';
import { SECTION_IDS } from './sections';

/** Footer navigation columns (titles: footer.columns.<key>.title). */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    key: 'preparation',
    links: [
      { kind: 'section', label: 'footer.links.program', target: SECTION_IDS.program },
      { kind: 'section', label: 'footer.links.process', target: SECTION_IDS.process },
      { kind: 'section', label: 'footer.links.lessons', target: SECTION_IDS.lessons },
      { kind: 'section', label: 'footer.links.pricing', target: SECTION_IDS.pricing },
      { kind: 'route', label: 'footer.links.summerSchool', to: ROUTES.SUMMER_SCHOOL },
    ],
  },
  {
    key: 'about',
    links: [
      { kind: 'section', label: 'footer.links.team', target: SECTION_IDS.about },
      { kind: 'section', label: 'footer.links.testimonials', target: SECTION_IDS.results },
      { kind: 'external', label: 'footer.links.binaryBioskop', href: BINARY_BIOSKOP_URL },
    ],
  },
  {
    key: 'support',
    links: [
      { kind: 'section', label: 'footer.links.faq', target: SECTION_IDS.faq },
      { kind: 'order', label: 'footer.links.apply', product: 'fullPrep' },
    ],
  },
];
