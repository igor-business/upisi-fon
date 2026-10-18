import type { ParseKeys } from 'i18next';
import type { ProductId } from './product';

/** Sections of the landing page. */
export type SectionKey = 'program' | 'process' | 'lessons' | 'about' | 'results' | 'pricing' | 'faq';

/** Router state that asks the landing page to scroll to a section after navigating to it. */
export interface ScrollToSectionState {
  scrollTo?: string;
}

/** A footer link: scrolls to a landing section, opens a page, opens the order dialog or an external site. */
export type FooterLink = { label: ParseKeys } & (
  | { kind: 'section'; target: string }
  | { kind: 'route'; to: string }
  | { kind: 'order'; product: ProductId }
  | { kind: 'external'; href: string }
);

/** A footer navigation column (title: footer.columns.<key>.title). */
export interface FooterColumn {
  key: 'preparation' | 'about' | 'support';
  links: readonly FooterLink[];
}
