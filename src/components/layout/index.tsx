import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Burger, Drawer } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AppConstants, RouteConstants } from '@constants';
import { Footer } from '@components';
import { useGoToSection } from '@/hooks/use-go-to-section';
import clsx from 'clsx';
import styles from './index.module.css';

/** Viewport width (Mantine "lg" breakpoint, 75em) from which the full navigation is shown. */
const DESKTOP_QUERY = '(min-width: 75em)';

/** A section becomes active once its top edge is within this many px of the bottom of the header. */
const ACTIVATION_OFFSET = 20;

export function Layout() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] = useDisclosure(false);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const navigate = useNavigate();
  const goTo = useGoToSection();
  const isHome = useLocation().pathname === RouteConstants.ROUTES.HOME;

  // Highlights the nav item of the section that has reached the top of the page (just below the header).
  useEffect(() => {
    // The sections only exist on the landing page.
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    const items = AppConstants.NAV_ITEMS;
    // Section id -> nav item it belongs to (a nav item can also cover neighbouring sections).
    const navTargetBySection = new Map<string, string>();
    for (const item of items) {
      navTargetBySection.set(item.target, item.target);
      item.covers?.forEach((id) => navTargetBySection.set(id, item.target));
    }
    let frame = 0;

    const update = () => {
      frame = 0;
      const header = document.querySelector('header');
      const threshold = (header?.offsetHeight ?? 0) + ACTIVATION_OFFSET;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      let closest = -Infinity;
      document.querySelectorAll<HTMLElement>('section[id]').forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top <= threshold && top > closest) {
          current = section.id;
          closest = top;
        }
      });

      const target = current ? (navTargetBySection.get(current) ?? null) : null;
      setActiveSection(atBottom ? items[items.length - 1].target : target);
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [isHome]);

  useEffect(() => {
    if (isDesktop) {
      closeMenu();
    }
  }, [isDesktop, closeMenu]);

  const goToSection = (id: string) => {
    closeMenu();
    goTo(id);
  };

  const goToRequest = () => {
    closeMenu();
    navigate(RouteConstants.ROUTES.PURCHASE);
  };

  const renderLinks = (linkClassName: string) =>
    AppConstants.NAV_ITEMS.map((item) => {
      const isActive = activeSection === item.target;
      return (
        <a
          key={item.index}
          href={isHome ? `#${item.target}` : `/#${item.target}`}
          className={clsx(linkClassName, isActive && styles.active)}
          aria-current={isActive ? 'true' : undefined}
          onClick={(event) => {
            event.preventDefault();
            goToSection(item.target);
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
          <a
            href="/"
            className={styles.logoLink}
            aria-label={t('a11y.home')}
            onClick={(event) => {
              event.preventDefault();
              closeMenu();
              if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate(RouteConstants.ROUTES.HOME);
              }
            }}
          >
            <img src={AppConstants.IMAGES.logo} alt="" className={styles.logo} />
          </a>
          <nav className={styles.nav} aria-label={t('a11y.mainNavigation')}>
            {renderLinks(styles.link)}
          </nav>
          <div className={styles.right}>
            <button type="button" className={styles.cta} onClick={goToRequest}>
              {t('header.cta')}
            </button>
            <Burger
              opened={menuOpened}
              onClick={toggleMenu}
              className={styles.burger}
              aria-label={menuOpened ? t('a11y.closeMenu') : t('a11y.openMenu')}
              size="md"
              color="var(--color-text)"
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
          onClick={goToRequest}
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
