import type { To } from 'react-router-dom';
import { ROUTES } from '@constants';

/** Smooth scrolling, unless the user asked the system for reduced motion. */
function getBehavior(animate: boolean): ScrollBehavior {
  if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'instant';
  }
  return 'smooth';
}

/**
 * Scrolls to the element with the given id (it stops below the sticky header thanks to
 * scroll-margin-top). Returns false when there is no such element.
 */
export function scrollToElement(id: string, animate: boolean): boolean {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: getBehavior(animate), block: 'start' });
  return element !== null;
}

/** Scrolls to the top of the page. */
export function scrollToTop(animate: boolean): void {
  window.scrollTo({ top: 0, behavior: getBehavior(animate) });
}

/** Address of a landing page section (/#id), or of the top of the landing page without an id. */
export function getSectionPath(id?: string): To {
  return { pathname: ROUTES.HOME, hash: id ? `#${id}` : '' };
}
