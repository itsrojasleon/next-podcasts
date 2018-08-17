import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.onRouteChangeStart = (url) => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = ({ children, title, back }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous" />
    </Head>
    <header>
      {back && (
        <Link href="/" className="back">
          <a className="go-back"><i className="fas fa-long-arrow-alt-left"></i> Back</a>
        </Link>
      )}
      <Link href="/"><a className={back ? '' : 'a'}>Podcasts</a></Link>
    </header>
    {children}
    <style>{`
    header {
      color: #000;
      background: #fff;
      padding: 15px;
      text-align: center;
      border-bottom: 1px solid rgb(240,240,240);
      display: grid;
      grid-template-columns: 1fr 1.1fr;
      justify-items: center;
      align-items: center;
    }   
    header .back {
      justify-self: left;
      color: rgb(160,167,174);
      font-size: 1em;
    } 
    header .back:hover {
      cursor: pointer;
    }
    header .go-back {
      color: rgb(160,167,174);
      font-weight: 200;
      font-size: 1.1em;
    }
    .fa-long-arrow-alt-left {
      color: rgb(160,167,174);
    }
    header a {
      color: #000;
      text-decoration: none;
      font-weight: bolder;
      font-size: 1.2em;
      transition: .2s;
      justify-self: left;
    }
    header a.a {
      justify-self: right;
    }
    header a:hover {
      color: rgb(110,110,100);
    }
    `}</style>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
      body {
        margin: 0;
        font-family: 'Open Sans', sans-serif;
        background-color: #F8F9F9;
      }
      #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: #29d;

          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;

          width: 100%;
          height: 2px;
        }

        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px #29d, 0 0 5px #29d;
          opacity: 1.0;

          -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
                  transform: rotate(3deg) translate(0px, -4px);
        }

        /* Remove these to get rid of the spinner */
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }

        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;

          border: solid 2px transparent;
          border-top-color: #29d;
          border-left-color: #29d;
          border-radius: 50%;

          -webkit-animation: nprogress-spinner 400ms linear infinite;
                  animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @-webkit-keyframes nprogress-spinner {
          0%   { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes nprogress-spinner {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

    `}</style>
  </div>
);
export default Layout;
