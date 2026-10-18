import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';
import { scrollToTop } from '@/utils/scroll';
import { useIsHomePage } from './use-is-home-page';

/** Returns a function that scrolls to the top of the landing page, navigating there if needed. */
export function useGoHome() {
  const navigate = useNavigate();
  const isHomePage = useIsHomePage();

  return useCallback(() => {
    if (isHomePage) {
      scrollToTop();
    } else {
      navigate(ROUTES.HOME);
    }
  }, [navigate, isHomePage]);
}
