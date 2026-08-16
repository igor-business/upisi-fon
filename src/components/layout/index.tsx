import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';
import { AppConstants, RouteConstants } from '@constants';
import { LanguageSwitcher } from '../language-switcher';
import clsx from 'clsx';
import styles from './index.module.css';

export function Layout() {
  const { t } = useTranslation();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles.link, isActive && styles.active);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.left}>
            <img
              src={AppConstants.IMAGES.logo}
              alt={AppConstants.APP_NAME}
              className={styles.logo}
            />
            <nav className={styles.nav}>
              <NavLink to={RouteConstants.ROUTES.HOME} end className={linkClass}>
                {t('nav.home')}
              </NavLink>
              <NavLink to={RouteConstants.ROUTES.ABOUT} className={linkClass}>
                {t('nav.about')}
              </NavLink>
            </nav>
          </div>
          <LanguageSwitcher />
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
