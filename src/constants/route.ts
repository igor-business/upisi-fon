/** Centralized route paths used with react-router. */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
