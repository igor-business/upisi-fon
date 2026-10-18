import { useLocation } from 'react-router-dom';
import { ROUTES } from '@constants';

/** Whether the landing page is open. */
export function useIsHomePage(): boolean {
  return useLocation().pathname === ROUTES.HOME;
}
