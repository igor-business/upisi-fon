import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { Burger, Drawer } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AppConstants, RouteConstants } from '@constants';
import { Footer } from '@components';
import { scrollToSection } from '@/utils/scroll';
import clsx from 'clsx';
import styles from './index.module.css';

/** Viewport width (Mantine "lg" breakpoint, 75em) from which the full navigation is shown. */
const DESKTOP_QUERY = '(min-width: 75em)';

export function Layout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] = useDisclosure(false);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  useEffect(() => {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    const sections = AppConstants.NAV_ITEMS.map((item) =>
      item.target ? document.getElementById(item.target) : null,
    ).filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: `-${headerHeight}px 0px -70% 0px`,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDesktop) {
      closeMenu();
    }
  }, [isDesktop, closeMenu]);

  const goToSection = (id: string) => {
    closeMenu();
    scrollToSection(id);
  };

  const goToApp = () => {
    closeMenu();
    navigate(RouteConstants.ROUTES.APP);
  };

  const renderLinks = (linkClassName: string) =>
    AppConstants.NAV_ITEMS.map((item) => {
      const isActive = item.target !== undefined && activeSection === item.target;
      return (
        <a
          key={item.index}
          href={item.target ? `#${item.target}` : '#'}
          className={clsx(linkClassName, isActive && styles.active)}
          aria-current={isActive ? 'true' : undefined}
          onClick={(event) => {
            event.preventDefault();
            if (item.target) {
              goToSection(item.target);
            }
          }}
        >
          {t(`landing.nav.${item.index}`)}
        </a>
      );
    });

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img
            src={AppConstants.IMAGES.logo}
            alt={t('appName')}
            className={styles.logo}
          />
          <nav className={styles.nav} aria-label={t('a11y.mainNavigation')}>
            {renderLinks(styles.link)}
          </nav>
          <div className={styles.right}>
            <button type="button" className={styles.cta} onClick={goToApp}>
              {t('header.cta')}
            </button>
            <Burger
              opened={menuOpened}
              onClick={toggleMenu}
              className={styles.burger}
              aria-label={menuOpened ? t('a11y.closeMenu') : t('a11y.openMenu')}
              size="md"
            />
          </div>
        </div>
      </header>

      <Drawer
        opened={menuOpened}
        onClose={closeMenu}
        position="right"
        size="min(20rem, 100%)"
        title={t('header.menuTitle')}
        closeButtonProps={{ 'aria-label': t('a11y.closeMenu') }}
        classNames={{ title: styles.drawerTitle }}
      >
        <nav className={styles.drawerNav} aria-label={t('a11y.mainNavigation')}>
          {renderLinks(styles.drawerLink)}
        </nav>
        <button
          type="button"
          className={clsx(styles.cta, styles.drawerCta)}
          onClick={goToApp}
        >
          {t('header.cta')}
        </button>
      </Drawer>

      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
