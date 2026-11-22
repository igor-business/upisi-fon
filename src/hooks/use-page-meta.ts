import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '@constants';

export interface PageMeta {
  /** Browser tab and search result title. */
  title: string;
  /** Search result description (keeps the one from index.html when left out). */
  description?: string;
  /** Asks search engines not to index the page (e.g. the 404 page). */
  noindex?: boolean;
}

/** Finds the <meta>/<link> element in <head>, creating it when it does not exist yet. */
function getHeadElement<T extends HTMLElement>(selector: string, create: () => T): T {
  const existing = document.head.querySelector<T>(selector);
  if (existing) {
    return existing;
  }
  const element = create();
  document.head.append(element);
  return element;
}

/**
 * Sets the title, description and canonical address of the current page in <head>. The landing
 * page defaults live in index.html, which is also what link previews (that do not run JavaScript) show.
 */
export function usePageMeta({ title, description, noindex = false }: PageMeta) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    if (description) {
      getHeadElement('meta[name="description"]', () => {
        const meta = document.createElement('meta');
        meta.name = 'description';
        return meta;
      }).content = description;
    }

    const canonical = getHeadElement('link[rel="canonical"]', () => {
      const link = document.createElement('link');
      link.rel = 'canonical';
      return link;
    });
    const robots = document.head.querySelector('meta[name="robots"]');

    if (noindex) {
      canonical.remove();
      getHeadElement('meta[name="robots"]', () => {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        return meta;
      }).content = 'noindex';
    } else {
      canonical.href = `${SITE_URL}${pathname}`;
      robots?.remove();
    }
  }, [title, description, noindex, pathname]);
}
