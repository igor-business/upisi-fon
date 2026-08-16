/** Application-wide constants. */
export const APP_NAME = 'My App';

/** Default language used on first load. */
export const DEFAULT_LANGUAGE = 'sr' as const;

/** All supported languages. */
export const SUPPORTED_LANGUAGES = ['sr', 'en'] as const;

/** Application version. */
export const APP_VERSION = '0.1.0';

/** Paths to static images (files served from the public folder). */
export const IMAGES = {
  logo: '/bird-logo.svg',
} as const;
