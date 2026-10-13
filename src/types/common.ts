import type { ReactNode } from 'react';

/** Supported application languages. */
export type Language = 'sr';

/** i18next namespace used across the app. */
export type TranslationNamespace = 'common';

/** Generic props shared by presentational components. */
export interface BaseComponentProps {
  className?: string;
}

/** Props for the Title component. */
export interface TitleProps {
  /** Title content (translated text passed from the page). */
  children: ReactNode;
  /** Heading level (h1-h3). Defaults to 2; the hero owns the page h1. */
  order?: 1 | 2 | 3;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the Description component. */
export interface DescriptionProps {
  /** Description content (translated text passed from the page). */
  children: ReactNode;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the PageContainer wrapper component. */
export interface PageContainerProps {
  /** Page content. */
  children: ReactNode;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the LandingSection component. */
export interface LandingSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Section description (translated text passed from the page). */
  description: ReactNode;
  /** Optional extra class name. */
  className?: string;
}

/** A single card of the ProblemSection component. */
export interface ProblemCard {
  /** Card title (translated text passed from the page). */
  title: ReactNode;
  /** Card description (translated text passed from the page). */
  description: ReactNode;
}

/** Props for the ProblemSection component. */
export interface ProblemSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Section description (translated text passed from the page). */
  description: ReactNode;
  /** Cards describing the problems students face. */
  cards: readonly ProblemCard[];
  /** Optional extra class name. */
  className?: string;
}

/** Props for the FeaturesSection component. */
export interface FeaturesSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Feature cards (same shape as the problem cards). */
  cards: readonly ProblemCard[];
  /** Label of the button below the cards. */
  actionLabel: ReactNode;
  /** Called when the button is clicked. */
  onAction: () => void;
  /** Optional extra class name. */
  className?: string;
}

/** A single statistic shown next to the testimonials. */
export interface TestimonialStat {
  /** Statistic value, e.g. "15.000+". */
  value: ReactNode;
  /** Short label below the value. */
  label: ReactNode;
}

/** A single testimonial. */
export interface Testimonial {
  /** Testimonial text. */
  quote: ReactNode;
  /** Author name. */
  name: ReactNode;
  /** Author details, e.g. "FON, 2025.". */
  meta: ReactNode;
}

/** Props for the TestimonialsSection component. */
export interface TestimonialsSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Statistics shown under the title. */
  stats: readonly TestimonialStat[];
  /** All testimonials; they are shown in pages of three. */
  testimonials: readonly Testimonial[];
  /** Accessible label of the carousel pagination. */
  paginationLabel: string;
  /** Builds the accessible label of a pagination dot (1-based page number). */
  getPageLabel: (page: number) => string;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the ProgramSection component. */
export interface ProgramSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Small label above the title. */
  eyebrow: ReactNode;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Section description (translated text passed from the page). */
  description: ReactNode;
  /** Checklist items. */
  items: readonly ReactNode[];
  /** Label of the button below the checklist. */
  actionLabel: ReactNode;
  /** Called when the button is clicked. */
  onAction: () => void;
  /** Content of the right-hand slot (image). An empty placeholder is shown when omitted. */
  media?: ReactNode;
  /** Optional extra class name. */
  className?: string;
}

/** Props for the ProcessSection component. */
export interface ProcessSectionProps {
  /** Element id used as anchor for header navigation and active-state tracking. */
  id: string;
  /** Small label above the title. */
  eyebrow: ReactNode;
  /** Section title (translated text passed from the page). */
  title: ReactNode;
  /** Steps shown in order (same shape as the problem cards). */
  steps: readonly ProblemCard[];
  /** Optional extra class name. */
  className?: string;
}

/** Props for the Hero component. */
export interface HeroProps {
  /** Small uppercase label above the main title. */
  eyebrow: ReactNode;
  /** Hero description (translated text passed from the page). */
  description: ReactNode;
  /** Label of the primary call-to-action button. */
  primaryAction: ReactNode;
  /** Label of the secondary call-to-action button. */
  secondaryAction: ReactNode;
  /** Alternative text of the hero image. */
  imageAlt: string;
  /** Optional extra class name. */
  className?: string;
}
