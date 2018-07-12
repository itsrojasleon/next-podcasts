import React, { Component } from 'react';
import 'isomorphic-fetch';
import Link from 'next/link';

// Prefetch juts works in production

// Prefetch just works with html, css and javascript...
// ¡Doesn't work with getInitialProps.

class Home extends Component {
  static async getInitialProps() {
    const URL = 'https://api.audioboom.com/channels/recommended';
    const request = await fetch(`${URL}`);
    const { body } = await request.json();

    return {
      channels: body,
    }
  }
  render() {
    const logo = '/static/platzi-logo.png';
    const { channels } = this.props;
    return (
      <div>
        <header>Podcasts</header>
        <div className="channels">
          {channels.map((channel) => (
            <Link href={`/channel?id=${channel.id}`} prefetch key={channel.id}>
              <a className="channel">
                <img src={channel.urls.logo_image.original} alt={channel.title} />
                <h2>{channel.title}</h2>
              </a>
            </Link>
          ))}
        </div>
        <style jsx>{`
          header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }
        .channels {
          display: grid;
          grid-gap: 15px;
          padding: 15px;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        }
        a.channel {
          display: block;
          margin-bottom: 0.5em;
          color: #333;
          text-decoration: none;
        }
        .channel img {
          border-radius: 3px;
          box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
          width: 100%;
        }
        h2 {
          padding: 5px;
          font-size: 0.9em;
          font-weight: 600;
          margin: 0;
          text-align: center;
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
    )
  }
}

export default Home;