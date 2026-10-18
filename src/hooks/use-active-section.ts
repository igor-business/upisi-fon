import { useEffect, useState } from 'react';

/** A section becomes active once its top edge is within this many px of the bottom of the header. */
const ACTIVATION_OFFSET = 20;

/** Tolerance (px) for treating the page as scrolled to the very bottom. */
const BOTTOM_TOLERANCE = 2;

/**
 * Returns the id of the section (one of `sectionIds`) that has reached the top of the page, just
 * below the sticky header. At the very bottom of the page the last section is active.
 */
export function useActiveSection(sectionIds: readonly string[], enabled: boolean): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const headerHeight = document.querySelector('header')?.offsetHeight ?? 0;
      const threshold = headerHeight + ACTIVATION_OFFSET;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - BOTTOM_TOLERANCE;

      let current: string | null = null;
      let closestTop = -Infinity;
      document.querySelectorAll<HTMLElement>('section[id]').forEach((section) => {
        const { top } = section.getBoundingClientRect();
        if (top <= threshold && top > closestTop) {
          current = section.id;
          closestTop = top;
        }
      });

      if (scrolledToBottom) {
        setActiveId(sectionIds[sectionIds.length - 1] ?? null);
      } else {
        setActiveId(current && sectionIds.includes(current) ? current : null);
      }
    };

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [sectionIds, enabled]);

  return activeId;
}
