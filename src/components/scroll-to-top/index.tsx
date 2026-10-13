import { useTranslation } from 'react-i18next';
import { Affix, ActionIcon } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import styles from './index.module.css';

/** Scroll offset (px) after which the button becomes visible. */
const VISIBILITY_THRESHOLD = 400;

export function ScrollToTop() {
  const { t } = useTranslation();
  const [scroll] = useWindowScroll();
  const visible = scroll.y > VISIBILITY_THRESHOLD;

  if (!visible) {
    return null;
  }

  return (
    <Affix position={{ bottom: '2rem', right: '2rem' }}>
      <ActionIcon
        size="xl"
        radius="xl"
        aria-label={t('a11y.scrollToTop')}
        className={styles.button}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </ActionIcon>
    </Affix>
  );
}

export default ScrollToTop;
