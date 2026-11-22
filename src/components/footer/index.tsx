import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CONTACT, FOOTER_COLUMNS, FOOTER_CONTACT_ID, IMAGES, SOCIAL_LINKS } from '@constants';
import { useIsHomePage } from '@/hooks';
import type { FooterLink } from '@/types';
import { getSectionPath } from '@/utils/scroll';
import { InstagramIcon } from '../icons';
import { useOrderDialog } from '../order-dialog';
import clsx from 'clsx';
import styles from './index.module.css';

const SOCIAL_ICONS = {
  instagram: <InstagramIcon size={20} />,
} as const;

/** A single footer link, rendered according to where it leads. */
function FooterLinkItem({ link }: { link: FooterLink }) {
  const { t } = useTranslation();
  const isHomePage = useIsHomePage();
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
        // Opens a dialog, not a page, so it is a button styled as a link.
        <button type="button" className={clsx(styles.link, styles.linkButton)} onClick={() => openOrder(link.product)}>
          {label}
        </button>
      );
    case 'section':
      return (
        <Link to={getSectionPath(link.target)} replace={isHomePage} className={styles.link}>
          {label}
        </Link>
      );
  }
}

export function Footer() {
  const { t } = useTranslation();
  const isHomePage = useIsHomePage();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to={getSectionPath()} replace={isHomePage} className={styles.logoLink} aria-label={t('a11y.home')}>
              <img src={IMAGES.logo} alt={t('appName')} className={styles.logo} />
            </Link>
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

            <div className={clsx(styles.column, styles.contactColumn)} id={FOOTER_CONTACT_ID}>
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
