import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Layout = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </Head>
    <header>
      <Link href="/"><a>Podcasts</a></Link>
    </header>
    {children}
    <style>{`
    header {
      color: #fff;
      background: #8756ca;
      padding: 15px;
      text-align: center;
    }
    header a {
      color: #fff;
      text-decoration: none;
    }
    `}</style>
    <style jsx global>{`
      body {
        margin: 0;
        font-family: system-ui;
        background-color: white;
      }
        `}</style>
  </div>
);
export default Layout;
