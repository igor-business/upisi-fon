import { useTranslation } from 'react-i18next';
import { ActionIcon, Affix, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useWindowScroll } from '@mantine/hooks';
import { useGoToSection, useIsHomePage } from '@/hooks';
import { scrollToTop } from '@/utils/scroll';
import { ArrowUpIcon } from '../icons';
import styles from './index.module.css';

/** Scroll offset (px) after which the button appears. */
const VISIBILITY_THRESHOLD = 400;

/** Floating button that brings the user back to the top of a long page (on every page). */
export function ScrollToTop() {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [scroll] = useWindowScroll();
  const isHomePage = useIsHomePage();
  const goToSection = useGoToSection();
  // Closer to the edge on phones, so it covers less of the content.
  const isPhone = useMediaQuery(`(width < ${theme.breakpoints.sm})`);
  const offset = isPhone ? '1rem' : '2rem';

  if (scroll.y <= VISIBILITY_THRESHOLD) {
    return null;
  }

  const handleClick = () => {
    if (isHomePage) {
      // Also clears the section (/#...) from the address.
      goToSection();
    } else {
      scrollToTop(true);
    }
  };

  return (
    <Affix position={{ bottom: offset, right: offset }}>
      <ActionIcon
        size="xl"
        radius="xl"
        aria-label={t('a11y.scrollToTop')}
        className={styles.button}
        onClick={handleClick}
      >
        <ArrowUpIcon />
      </ActionIcon>
    </Affix>
  );
}
