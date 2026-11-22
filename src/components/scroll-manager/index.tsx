import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { scrollToElement, scrollToTop } from '@/utils/scroll';

/** Last scroll position of every visited history entry, by location key (for Back and Forward). */
const savedPositions = new Map<string, number>();

/**
 * Takes over scrolling on navigation from the browser:
 * - Back / Forward return to the position the user left the page at.
 * - An address with a section (/#cenovnik) scrolls to it: smoothly when the user is already on that
 *   page, instantly when the page has just been opened (also from a shared link or a new tab).
 * - Any other new page starts at the top, without an animation.
 */
export function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previous = useRef<{ key: string; pathname: string } | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Keeps the position of the current history entry up to date while the user scrolls.
  useEffect(() => {
    const save = () => savedPositions.set(location.key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [location.key]);

  // A layout effect, so the new page never shows up at the old scroll position first.
  useLayoutEffect(() => {
    // Runs once per navigation (React's StrictMode runs effects twice in development).
    if (previous.current?.key === location.key) {
      return;
    }
    const samePage = previous.current?.pathname === location.pathname;
    previous.current = { key: location.key, pathname: location.pathname };

    if (navigationType === 'POP') {
      const saved = savedPositions.get(location.key);
      if (saved !== undefined) {
        window.scrollTo({ top: saved, behavior: 'instant' });
        return;
      }
    }

    const sectionId = decodeURIComponent(location.hash.slice(1));
    if (sectionId && scrollToElement(sectionId, samePage)) {
      return;
    }
    scrollToTop(samePage);
  }, [location.key, location.pathname, location.hash, navigationType]);

  return null;
}
