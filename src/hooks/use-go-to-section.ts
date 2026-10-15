import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteConstants } from '@constants';
import { ScrollToSectionState } from '@/types/common';
import { scrollToSection } from '@/utils/scroll';

/**
 * Returns a function that brings the user to a landing page section: it scrolls when the
 * landing page is open and otherwise navigates to it first (the landing page then scrolls).
 */
export function useGoToSection() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string) => {
      if (pathname === RouteConstants.ROUTES.HOME) {
        scrollToSection(id);
      } else {
        navigate(RouteConstants.ROUTES.HOME, {
          state: { scrollTo: id } satisfies ScrollToSectionState,
        });
      }
    },
    [navigate, pathname],
  );
}
