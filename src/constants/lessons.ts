import type { LessonGroup } from '@/types';

/** Groups of the free lessons in display order (titles: lessons.groups.<group>). */
export const LESSON_GROUPS: readonly LessonGroup[] = ['intro', 'numbers', 'polynomials'];

/** The free lessons (YouTube videos) in display order. Titles: lessons.titles.<videoId>. */
export const LESSONS = [
  { videoId: 'yKSV0r1mNYI', group: 'intro', duration: '06:49' },
  { videoId: 'cWvbm5iTFyw', group: 'numbers', duration: '18:29' },
  { videoId: 'w-Plfi1zNpg', group: 'numbers', duration: '33:15' },
  { videoId: 'SIS2u48d1mM', group: 'numbers', duration: '41:25' },
  { videoId: 'd69k8H9iAKg', group: 'numbers', duration: '1:05:41' },
  { videoId: 'vUQYsHMWS0k', group: 'numbers', duration: '49:48' },
  { videoId: 'gF_HtNvA83c', group: 'numbers', duration: '33:23' },
  { videoId: '1CBCjGYlBJI', group: 'polynomials', duration: '29:56' },
  { videoId: 'Zy6iGVHvRis', group: 'polynomials', duration: '42:39' },
  { videoId: 'K7MsUQu6NNo', group: 'polynomials', duration: '37:48' },
  { videoId: 'uzwmXrOOho0', group: 'polynomials', duration: '32:24' },
] as const satisfies readonly { videoId: string; group: LessonGroup; duration: string }[];

/** A free lesson. */
export type Lesson = (typeof LESSONS)[number];

/** Lessons shown on the landing page: the first lesson of every group. */
export const FEATURED_LESSONS: readonly Lesson[] = LESSON_GROUPS.map(
  (group) => LESSONS.find((lesson) => lesson.group === group)!,
);
