import { Title } from '@components';
import { TestimonialsSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function TestimonialsSection({
  id,
  title,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <Title className={styles.title}>{title}</Title>

        <ul className={styles.cards}>
          {testimonials.map((item) => (
            <li key={item.name} className={styles.card}>
              <blockquote className={styles.quote}>„{item.quote}”</blockquote>
              <div className={styles.author}>
                <div className={styles.authorText}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.meta}>{item.meta}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TestimonialsSection;
