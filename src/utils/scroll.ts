/** Smoothly scrolls the page to the element with the given id. */
export function scrollToSection(id: string, block: ScrollLogicalPosition = 'start'): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block });
}

/** Smoothly scrolls to the top of the page. */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
