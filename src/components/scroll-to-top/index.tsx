import { useTranslation } from 'react-i18next';
import { ActionIcon, Affix } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { scrollToTop } from '@/utils/scroll';
import { ArrowUpIcon } from '../icons';
import styles from './index.module.css';

/** Scroll offset (px) after which the button appears. */
const VISIBILITY_THRESHOLD = 400;

/** Floating button that brings the user back to the top of a long page. */
export function ScrollToTop() {
  const { t } = useTranslation();
  const [scroll] = useWindowScroll();

  if (scroll.y <= VISIBILITY_THRESHOLD) {
    return null;
  }

  return (
    <Affix position={{ bottom: '2rem', right: '2rem' }}>
      <ActionIcon
        size="xl"
        radius="xl"
        aria-label={t('a11y.scrollToTop')}
        className={styles.button}
        onClick={scrollToTop}
      >
        <ArrowUpIcon />
      </ActionIcon>
    </Affix>
  );
}
