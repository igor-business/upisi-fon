import { useEffect, useState } from 'react';
import { Title } from '@components';
import { AppConstants } from '@constants';
import { TestimonialsSectionProps } from '@/types/common';
import clsx from 'clsx';
import styles from './index.module.css';

export function TestimonialsSection({
  id,
  title,
  stats,
  testimonials,
  paginationLabel,
  getPageLabel,
  className,
}: TestimonialsSectionProps) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const pages = Array.from(
    { length: Math.ceil(testimonials.length / AppConstants.TESTIMONIALS_PER_PAGE) },
    (_, i) =>
      testimonials.slice(
        i * AppConstants.TESTIMONIALS_PER_PAGE,
        (i + 1) * AppConstants.TESTIMONIALS_PER_PAGE,
      ),
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reducedMotion || pages.length < 2) {
      return;
    }
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % pages.length);
    }, AppConstants.TESTIMONIALS_INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused, pages.length, page]);

  return (
    <section id={id} className={clsx(styles.section, className)}>
      <div className={styles.content}>
        <div className={styles.intro}>
          <Title className={styles.title}>{title}</Title>
          <dl className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className={styles.carousel}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pages.map((items, pageIndex) => (
                <ul
                  key={pageIndex}
                  className={styles.page}
                  aria-hidden={pageIndex !== page}
                  inert={pageIndex !== page}
                >
                  {items.map((item, index) => (
                    <li key={index} className={styles.card}>
                      <blockquote className={styles.quote}>„{item.quote}”</blockquote>
                      <div className={styles.author}>
                        <span className={styles.avatar} aria-hidden="true" />
                        <div className={styles.authorText}>
                          <p className={styles.name}>{item.name}</p>
                          <p className={styles.meta}>{item.meta}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className={styles.dots} role="group" aria-label={paginationLabel}>
            {pages.map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                className={clsx(styles.dot, pageIndex === page && styles.dotActive)}
                aria-label={getPageLabel(pageIndex + 1)}
                aria-current={pageIndex === page ? 'true' : undefined}
                onClick={() => setPage(pageIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
