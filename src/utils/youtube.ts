/** YouTube thumbnail of a video (hqdefault is 4:3 with black bars, so it is shown cropped). */
export const getVideoThumbnail = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

/** Privacy-friendly YouTube embed that starts playing right away. */
export const getVideoEmbedUrl = (videoId: string) =>
  `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
