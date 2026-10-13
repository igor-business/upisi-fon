/** Smoothly scrolls the page to the element with the given id. */
export function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
