import React from 'react';
import { useLayoutStyles } from '../../styles';
import SEO from '../shared/Seo';
import Navbar from './navbar/Navbar';

const Layout = ({ children, title, marginTop = 60 }) => {
  const cx = useLayoutStyles();

  return (
    <section className={cx.section}>
      <SEO title={title} />
      <Navbar />
      <main className={cx.main} style={{ marginTop }}>
        <section className={cx.childrenWrapper}>
          <div className={cx.children}>{children}</div>
        </section>
      </main>
    </section>
  );
};

export default Layout;
