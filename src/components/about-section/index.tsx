import { Button } from '@mantine/core';
import { Title, Description } from '@components';
import { AboutSectionProps, TeamMember } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

/** Up to two initials of a name (used by the photo placeholder). */
const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

function MemberCard({ member, featured }: { member: TeamMember; featured: boolean }) {
  return (
    <article className={clsx(styles.card, featured && styles.cardFeatured)}>
      <div className={styles.photo}>
        {member.photo ?? (
          <span className={styles.initials} aria-hidden="true">
            {getInitials(member.name)}
          </span>
        )}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.role}>{member.role}</p>
        <h3 className={styles.name}>{member.name}</h3>
        {member.description.split('\n\n').map((paragraph) => (
          <p key={paragraph} className={styles.bio}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}

export function AboutSection({
  id,
  title,
  description,
  members,
  partner,
  className,
}: AboutSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <Title className={styles.title}>{title}</Title>
          <Description className={styles.description}>{description}</Description>
        </div>

        <div className={styles.cards}>
          {members.map((member, index) => (
            <MemberCard key={member.name} member={member} featured={index === 0} />
          ))}
        </div>

        <div className={styles.partner}>
          <div className={styles.logo}>{partner.logo}</div>
          <div className={styles.partnerText}>
            <h3 className={styles.partnerTitle}>{partner.title}</h3>
            <p className={styles.partnerDescription}>{partner.description}</p>
          </div>
          <Button
            component="a"
            href={partner.actionHref}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="default"
            className={styles.partnerAction}
          >
            {partner.actionLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
