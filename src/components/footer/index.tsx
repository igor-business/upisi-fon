import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppConstants, RouteConstants } from '@constants';
import { useGoToSection } from '@/hooks/use-go-to-section';
import styles from './index.module.css';

const SOCIAL_ICONS = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  ),
} as const;

export function Footer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToSection = useGoToSection();
  const isHome = useLocation().pathname === RouteConstants.ROUTES.HOME;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a
              href={RouteConstants.ROUTES.HOME}
              className={styles.logoLink}
              aria-label={t('a11y.home')}
              onClick={(event) => {
                event.preventDefault();
                if (isHome) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate(RouteConstants.ROUTES.HOME);
                }
              }}
            >
              <img src={AppConstants.IMAGES.logo} alt={t('appName')} className={styles.logo} />
            </a>
            <p className={styles.description}>{t('footer.description')}</p>
            <ul className={styles.socials} aria-label={t('a11y.socials')}>
              {AppConstants.SOCIAL_LINKS.map((social) => (
                <li key={social.key}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={t(`footer.socials.${social.key}`)}
                    target="_blank"
                    rel="noopener noreferrer"
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
                  {column.links.map((link) => {
                    const label = t(`footer.columns.${column.key}.items.${link.key}`);
                    return (
                      <li key={link.key}>
                        {link.kind === 'route' && (
                          <Link to={link.to} className={styles.link}>
                            {label}
                          </Link>
                        )}
                        {link.kind === 'external' && (
                          <a
                            href={link.href}
                            className={styles.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {label}
                          </a>
                        )}
                        {link.kind === 'section' && (
                          <a
                            href={`/#${link.target}`}
                            className={styles.link}
                            onClick={(event) => {
                              event.preventDefault();
                              goToSection(link.target);
                            }}
                          >
                            {label}
                          </a>
                        )}
                      </li>
                    );
                  })}
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
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
