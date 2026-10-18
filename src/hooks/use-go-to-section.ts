import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';
import type { ScrollToSectionState } from '@/types';
import { scrollToSection } from '@/utils/scroll';
import { useIsHomePage } from './use-is-home-page';

/**
 * Returns a function that brings the user to a landing page section: it scrolls when the
 * landing page is open and otherwise navigates there first (the landing page then scrolls).
 */
export function useGoToSection() {
  const navigate = useNavigate();
  const isHomePage = useIsHomePage();

  return useCallback(
    (id: string) => {
      if (isHomePage) {
        scrollToSection(id);
      } else {
        navigate(ROUTES.HOME, { state: { scrollTo: id } satisfies ScrollToSectionState });
      }
    },
    [navigate, isHomePage],
  );
}
