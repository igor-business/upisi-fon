import { Outlet } from 'react-router-dom';
import { Footer } from '../footer';
import { Header } from '../header';
import styles from './index.module.css';

/** Shared frame of the public pages: header, page content and footer. */
export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
