import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from '@components';
import { ROUTES } from '@constants';
import { AppPage, LandingPage, LessonsPage, SummerSchoolPage } from '@pages';
import type { ScrollToSectionState } from '@/types';

/** Starts every new page at the top, unless the navigation asks to scroll to a section. */
function ScrollToTopOnNavigate() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (!(state as ScrollToSectionState | null)?.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
}

export function Router() {
  return (
    <BrowserRouter>
      <ScrollToTopOnNavigate />
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LESSONS} element={<LessonsPage />} />
          <Route path={ROUTES.SUMMER_SCHOOL} element={<SummerSchoolPage />} />
        </Route>
        <Route path={ROUTES.APP} element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}
