import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { ScrollToSectionState } from '@/types';

/** Scrolls to the section requested in the router state (e.g. "back to pricing" from another page). */
export function useScrollToRequestedSection() {
  const { state } = useLocation();
  const target = (state as ScrollToSectionState | null)?.scrollTo;

  useEffect(() => {
    if (!target) {
      return;
    }
    // Waits one frame, so the section is rendered and laid out.
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [target, state]);
}
