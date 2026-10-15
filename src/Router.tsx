import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { RouteConstants } from '@constants';
import { Layout } from '@components';
import { AppPage, LandingPage, LessonsPage, PurchasePage, SummerSchoolPage } from '@pages';
import { ScrollToSectionState } from '@/types/common';

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
          <Route path={RouteConstants.ROUTES.HOME} element={<LandingPage />} />
          <Route path={RouteConstants.ROUTES.LESSONS} element={<LessonsPage />} />
          <Route path={RouteConstants.ROUTES.SUMMER_SCHOOL} element={<SummerSchoolPage />} />
        </Route>
        <Route path={RouteConstants.ROUTES.PURCHASE} element={<PurchasePage />} />
        <Route path={RouteConstants.ROUTES.APP} element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
