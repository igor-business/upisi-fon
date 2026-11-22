import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, ScrollManager } from '@components';
import { ROUTES } from '@constants';
import { LandingPage, LessonsPage, NotFoundPage, SummerSchoolPage } from '@pages';

export function Router() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LESSONS} element={<LessonsPage />} />
          <Route path={ROUTES.SUMMER_SCHOOL} element={<SummerSchoolPage />} />
          {/* Every other address. */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
