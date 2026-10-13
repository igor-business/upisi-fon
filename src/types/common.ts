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
