import { useEffect, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Burger, Button, Drawer, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IMAGES, NAV_SECTIONS, SECTION_IDS } from '@constants';
import { useActiveSection, useGoHome, useGoToSection, useIsHomePage } from '@/hooks';
import { useOrderDialog } from '../order-dialog';
import clsx from 'clsx';
import styles from './index.module.css';

/** Ids of the sections linked from the navigation, in page order. */
const NAV_SECTION_IDS = NAV_SECTIONS.map((key) => SECTION_IDS[key]);

/** Sticky header with the logo, the section navigation and the application button; a drawer on small screens. */
export function Header() {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [menuOpened, { toggle: toggleMenu, close: closeMenu }] = useDisclosure(false);
  const isDesktop = useMediaQuery(`(width >= ${theme.breakpoints.lg})`);
  const isHomePage = useIsHomePage();
  const activeSectionId = useActiveSection(NAV_SECTION_IDS, isHomePage);
  const goHome = useGoHome();
  const goToSection = useGoToSection();
  const { openOrder } = useOrderDialog();

  // The drawer is only for small screens.
  useEffect(() => {
    if (isDesktop) {
      closeMenu();
    }
  }, [isDesktop, closeMenu]);

  const handleLogoClick = (event: MouseEvent) => {
    event.preventDefault();
    closeMenu();
    goHome();
  };

  const handleApply = () => {
    closeMenu();
    openOrder('fullPrep');
  };

  const renderLinks = (linkClassName: string) =>
    NAV_SECTIONS.map((key) => {
      const id = SECTION_IDS[key];
      const isActive = activeSectionId === id;
      return (
        <a
          key={key}
          href={`/#${id}`}
          className={clsx(linkClassName, isActive && styles.active)}
          aria-current={isActive ? 'true' : undefined}
          onClick={(event) => {
            event.preventDefault();
            closeMenu();
            goToSection(id);
          }}
        >
          {t(`nav.${key}`)}
        </a>
      );
    });

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <a href="/" className={styles.logoLink} aria-label={t('a11y.home')} onClick={handleLogoClick}>
            <img src={IMAGES.logo} alt="" className={styles.logo} />
          </a>
          <nav className={styles.nav} aria-label={t('a11y.mainNavigation')}>
            {renderLinks(styles.link)}
          </nav>
          <div className={styles.actions}>
            <Button size="sm" className={styles.cta} onClick={handleApply}>
              {t('header.cta')}
            </Button>
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
        <Button size="md" fullWidth className={styles.drawerCta} onClick={handleApply}>
          {t('header.cta')}
        </Button>
      </Drawer>
    </>
  );
}
