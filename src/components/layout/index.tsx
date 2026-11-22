import { Outlet } from 'react-router-dom';
import { Footer } from '../footer';
import { Header } from '../header';
import { ScrollToTop } from '../scroll-to-top';
import styles from './index.module.css';

/** Shared frame of the public pages: header, page content, footer and the back-to-top button. */
export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
