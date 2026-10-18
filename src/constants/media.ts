/** Paths to static images (served from the public folder). */
export const IMAGES = {
  logo: '/logo.svg',
  hero: '/images/hero-illustration-v3.webp',
  binaryBioskop: '/images/binary-bioskop.webp',
  teacher: '/images/daliborka-vujic.webp',
  founder: '/images/bojan-martinovic.webp',
  programLessons: '/images/program-lessons.webp',
  programExams: '/images/program-exams.webp',
  programMentor: '/images/program-mentor.webp',
} as const;

/** Intrinsic image sizes (prevent layout shift while the images load). */
export const IMAGE_SIZES = {
  hero: { width: 1670, height: 941 },
  binaryBioskop: { width: 250, height: 288 },
  programCard: { width: 512, height: 512 },
  member: { width: 480, height: 480 },
} as const;

