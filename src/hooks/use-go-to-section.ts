import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSectionPath } from '@/utils/scroll';
import { useIsHomePage } from './use-is-home-page';

/**
 * Returns a function that brings the user to a landing page section, or to the top of the landing
 * page without an id. The address changes to /#id, so it can be shared; on the landing page itself
 * the history entry is replaced (Back still leaves the page) and ScrollManager scrolls smoothly.
 */
export function useGoToSection() {
  const navigate = useNavigate();
  const isHomePage = useIsHomePage();

  return useCallback(
    (id?: string) => {
      navigate(getSectionPath(id), { replace: isHomePage });
    },
    [navigate, isHomePage],
  );
}
