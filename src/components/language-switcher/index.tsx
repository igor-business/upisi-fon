import { useTranslation } from 'react-i18next';
import { AppConstants } from '@constants';
import clsx from 'clsx';
import styles from './index.module.css';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage;

  return (
    <div className={styles.switcher} role="group" aria-label="Language">
      {AppConstants.SUPPORTED_LANGUAGES.map((language) => (
        <button
          key={language}
          type="button"
          className={clsx(styles.button, current === language && styles.active)}
          onClick={() => i18n.changeLanguage(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
