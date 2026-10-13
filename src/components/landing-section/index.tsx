import { Title, Description } from '@components';
import { LandingSectionProps } from '@/types/common';
import styles from './index.module.css';

export function LandingSection({ id, title, description, className }: LandingSectionProps) {
  return (
    <section id={id} className={className}>
      <div className={styles.content}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
    </section>
  );
}

export default LandingSection;
