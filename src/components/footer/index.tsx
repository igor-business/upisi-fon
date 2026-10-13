import { useTranslation } from 'react-i18next';
import { AppConstants } from '@constants';
import { scrollToSection } from '@/utils/scroll';
import styles from './index.module.css';

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  width: 20,
  height: 20,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const SOCIAL_ICONS = {
  instagram: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-1.5 1-2 2-2s2 .8 2 2.2V16" />
    </svg>
  ),
  youtube: (
    <svg {...ICON_PROPS}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" />
    </svg>
  ),
} as const;

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src={AppConstants.IMAGES.logo} alt={t('appName')} className={styles.logo} />
            <p className={styles.description}>{t('footer.description')}</p>
            <ul className={styles.socials} aria-label={t('a11y.socials')}>
              {AppConstants.SOCIAL_LINKS.map((social) => (
                <li key={social.key}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={t(`footer.socials.${social.key}`)}
                  >
                    {SOCIAL_ICONS[social.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.columns} aria-label={t('a11y.footerNavigation')}>
            {AppConstants.FOOTER_COLUMNS.map((column) => (
              <div key={column.key} className={styles.column}>
                <h2 className={styles.columnTitle}>{t(`footer.columns.${column.key}.title`)}</h2>
                <ul className={styles.list}>
                  {column.links.map((link) => (
                    <li key={link.key}>
                      <a
                        href={`#${link.target}`}
                        className={styles.link}
                        onClick={(event) => {
                          event.preventDefault();
                          scrollToSection(link.target);
                        }}
                      >
                        {t(`footer.columns.${column.key}.items.${link.key}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={styles.column}>
              <h2 className={styles.columnTitle}>{t('footer.columns.contact.title')}</h2>
              <ul className={styles.list}>
                <li>
                  <a href={AppConstants.CONTACT.phoneHref} className={styles.link}>
                    {AppConstants.CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a href={AppConstants.CONTACT.emailHref} className={styles.link}>
                    {AppConstants.CONTACT.email}
                  </a>
                </li>
                <li className={styles.text}>{t('footer.columns.contact.address')}</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <ul className={styles.legal}>
            {AppConstants.LEGAL_LINKS.map((item) => (
              <li key={item.key}>
                <a href={item.href} className={styles.legalLink}>
                  {t(`footer.legal.${item.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
