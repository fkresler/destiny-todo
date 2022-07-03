import * as React from 'react';
import Header from './Header';
import Footer from './Footer';
import { SessionProvider } from '../context/session';
import styles from '../styles/Home.module.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <SessionProvider>
        <Header />
        <main className={styles.main}>
          { children }
        </main>
        <Footer />
      </SessionProvider>
    </div>
  );
}

export default Layout;
