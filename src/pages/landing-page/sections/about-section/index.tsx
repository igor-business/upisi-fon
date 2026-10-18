import { Trans, useTranslation } from 'react-i18next';
import { Button } from '@mantine/core';
import { Description, Section, Title, TitleAccent } from '@components';
import { BINARY_BIOSKOP_URL, IMAGES, IMAGE_SIZES, SECTION_IDS } from '@constants';
import clsx from 'clsx';
import styles from './index.module.css';

/** People behind the preparation; the first one gets the large card (texts: about.members.<key>). */
const MEMBERS = ['teacher', 'founder'] as const;

type Member = (typeof MEMBERS)[number];

function MemberCard({ member, featured }: { member: Member; featured: boolean }) {
  const { t } = useTranslation();

  return (
    <article className={clsx(styles.card, featured && styles.cardFeatured)}>
      <div className={styles.photoWrap}>
        <div className={styles.photo}>
          <img
            src={IMAGES[member]}
            alt={t(`about.members.${member}.photoAlt`)}
            width={IMAGE_SIZES.member.width}
            height={IMAGE_SIZES.member.height}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.role}>{t(`about.members.${member}.role`)}</p>
        <h3 className={styles.name}>{t(`about.members.${member}.name`)}</h3>
        {/* Paragraphs of the biography are separated by an empty line. */}
        {t(`about.members.${member}.description`)
          .split('\n\n')
          .map((paragraph) => (
            <p key={paragraph} className={styles.bio}>
              {paragraph}
            </p>
          ))}
      </div>
    </article>
  );
}

/** "Who is behind the preparation": the teacher, the founder and Binary Bioskop. */
export function AboutSection() {
  const { t } = useTranslation();

  return (
    <Section id={SECTION_IDS.about} contentClassName={styles.content}>
      <div className={styles.intro}>
        <Title>
          <Trans i18nKey="about.title" components={{ 1: <TitleAccent /> }} />
        </Title>
        <Description className={styles.description}>{t('about.description')}</Description>
      </div>

      <div className={styles.cards}>
        {MEMBERS.map((member, index) => (
          <MemberCard key={member} member={member} featured={index === 0} />
        ))}
      </div>

      <div className={styles.partner}>
        <div className={styles.logo}>
          <img
            src={IMAGES.binaryBioskop}
            alt={t('about.partner.logoAlt')}
            width={IMAGE_SIZES.binaryBioskop.width}
            height={IMAGE_SIZES.binaryBioskop.height}
            loading="lazy"
          />
        </div>
        <div className={styles.partnerText}>
          <h3 className={styles.partnerTitle}>{t('about.partner.title')}</h3>
          <p className={styles.partnerDescription}>{t('about.partner.description')}</p>
        </div>
        <Button
          component="a"
          href={BINARY_BIOSKOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          variant="default"
          className={styles.partnerAction}
        >
          {t('about.partner.action')}
        </Button>
      </div>
    </Section>
  );
}
