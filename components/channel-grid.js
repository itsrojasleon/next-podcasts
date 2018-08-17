import React from 'react';
import { Link } from '../routes';

import slug from '../helpers/slug';

const ChannelGrid = ({ channels, box }) => (
  <div className={box ? 'channels' : 'channels-simple'}>
    { channels.map((channel) => (
      <Link route="channel" params={{
        slug: slug(channel.title),
        id: channel.id,
      }} prefetch key={channel.id}>
        <a className="channel">
          <img src={ channel.urls.logo_image.original } alt=""/>
          <h2>{ channel.title }</h2>
        </a>
      </Link>
    )) }

    <style jsx>{`
      .channels {
        width: 80%;
        margin: auto;
        display: grid;
        grid-gap: 15px;
        padding: 15px;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
      .channels-simple {
        width: 100%;
        display: grid;
        margin: auto;
        grid-gap: 15px;
        padding: 15px;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        box-sizing: border-box;
        align-items: stretch;
        height: 100%;
      }
      .channel {
        display: block;
        margin-bottom: 0.5em;
        color: #333;
        text-decoration: none;
        background-color: #fff;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 4px;
        transition: .2s;
      }
      .channel:hover {
        padding: 0;
      }
      .channel img {
        border-radius: 3px;
        box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
        width: 100%;
      }
      h2 {
        padding: 5px;
        font-size: 1em;
        font-weight: 300;
        margin: 0;
        text-align: center;
      }
    `}</style>
  </div>
);
export default ChannelGrid;