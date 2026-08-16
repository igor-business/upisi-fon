import type { ReactNode } from 'react';

/** Supported application languages. */
export type Language = 'sr' | 'en';

/** i18next namespace used across the app. */
export type TranslationNamespace = 'common';

/** Translation keys for navigation labels. */
export type NavKey = 'nav.home' | 'nav.about';

/** Translation keys grouped by page (root-level page objects). */
export type PageKey =
  | 'home.title'
  | 'home.description'
  | 'about.title'
  | 'about.description';

/** Generic props shared by presentational components. */
export interface BaseComponentProps {
  className?: string;
}

/** Props for the Title component. */
export interface TitleProps {
  /** Title content (translated text passed from the page). */
  children: ReactNode;
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
