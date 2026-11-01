/** Paths to static images (served from the public folder). */
export const IMAGES = {
  logo: '/logo.svg',
  /** The UpišiFON mascot (an owl), used as the brand's trademark. */
  hero: '/images/maskota-1.webp',
  binaryBioskop: '/images/binary-bioskop.webp',
  teacher: '/images/daliborka-vujic.webp',
  founder: '/images/bojan-martinovic.webp',
  programLessons: '/images/program-lessons.webp',
  programExams: '/images/program-exams.webp',
  programMentor: '/images/program-mentor.webp',
} as const;

/** Intrinsic image sizes (prevent layout shift while the images load). */
export const IMAGE_SIZES = {
  hero: { width: 1262, height: 833 },
  binaryBioskop: { width: 250, height: 288 },
  programCard: { width: 512, height: 512 },
  member: { width: 480, height: 480 },
} as const;

