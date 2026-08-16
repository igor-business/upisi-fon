import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteConstants } from '@constants';
import { Layout } from '@components';
import { HomePage, AboutPage } from '@pages';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={RouteConstants.ROUTES.HOME} element={<HomePage />} />
          <Route path={RouteConstants.ROUTES.ABOUT} element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
