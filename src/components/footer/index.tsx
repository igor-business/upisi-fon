import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CONTACT, FOOTER_COLUMNS, FOOTER_CONTACT_ID, IMAGES, ROUTES, SOCIAL_LINKS } from '@constants';
import { useGoHome, useGoToSection } from '@/hooks';
import type { FooterLink } from '@/types';
import { InstagramIcon } from '../icons';
import { useOrderDialog } from '../order-dialog';
import styles from './index.module.css';

const SOCIAL_ICONS = {
  instagram: <InstagramIcon size={20} />,
} as const;

/** A single footer link, rendered according to where it leads. */
function FooterLinkItem({ link }: { link: FooterLink }) {
  const { t } = useTranslation();
  const goToSection = useGoToSection();
  const { openOrder } = useOrderDialog();
  const label = t(link.label);

  switch (link.kind) {
    case 'route':
      return (
        <Link to={link.to} className={styles.link}>
          {label}
        </Link>
      );
    case 'external':
      return (
        <a href={link.href} className={styles.link} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    case 'order':
      return (
        <a
          href="#"
          className={styles.link}
          onClick={(event) => {
            event.preventDefault();
            openOrder(link.product);
          }}
        >
          {label}
        </a>
      );
    case 'section':
      return (
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
      );
  }
}

export function Footer() {
  const { t } = useTranslation();
  const goHome = useGoHome();

  const handleLogoClick = (event: MouseEvent) => {
    event.preventDefault();
    goHome();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href={ROUTES.HOME} className={styles.logoLink} aria-label={t('a11y.home')} onClick={handleLogoClick}>
              <img src={IMAGES.logo} alt={t('appName')} className={styles.logo} />
            </a>
            <p className={styles.description}>{t('footer.description')}</p>
            <ul className={styles.socials} aria-label={t('a11y.socials')}>
              {SOCIAL_LINKS.map((social) => (
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
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.key} className={styles.column}>
                <h2 className={styles.columnTitle}>{t(`footer.columns.${column.key}.title`)}</h2>
                <ul className={styles.list}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={styles.column} id={FOOTER_CONTACT_ID}>
              <h2 className={styles.columnTitle}>{t('footer.columns.contact.title')}</h2>
              <ul className={styles.list}>
                <li>
                  <a href={CONTACT.phoneHref} className={styles.link}>
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.emailHref} className={styles.link}>
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}
