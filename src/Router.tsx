import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteConstants } from '@constants';
import { Layout } from '@components';
import { LandingPage, AppPage } from '@pages';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={RouteConstants.ROUTES.HOME} element={<LandingPage />} />
        </Route>
        <Route path={RouteConstants.ROUTES.APP} element={<AppPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
