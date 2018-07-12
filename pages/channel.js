import React, { Component } from 'react';

class Channel extends Component {
  static async getInitialProps({ query }) {
    const idChannel = query.id;
    const URL = `https://api.audioboom.com/channels`;

    const [reqChannel, reqSeries, reqAudios] = await Promise.all([
      fetch(`${URL}/${idChannel}`),
      fetch(`${URL}/${idChannel}/child_channels`),
      fetch(`${URL}/${idChannel}/audio_clips`),
    ]);

    let { body: { channel } } = await reqChannel.json();
    let { body: { audio_clips } } = await reqAudios.json();
    let { body: { channels } } = await reqSeries.json();

    return { channel, audioClips: audio_clips, series: channels }
  }
  render() {
    const { channel, audioClips, series } = this.props;
    return (
      <div>
        <header>Podcasts</header>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        <h1>{ channel.title }</h1>
        { series.length > 0 &&
          <div>
            <h2>Series</h2>
            <div className="channels">
              { series.map((serie) => (
                <Link href={`/channel?id=${ serie.id }`} prefetch>
                  <a className="channel">
                    <img src={ serie.urls.logo_image.original } alt=""/>
                    <h2>{ serie.title }</h2>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        }
        <h2>Ultimos Podcasts</h2>
        { audioClips.map((clip) => (
          <div className="podcast" key={clip.id}>{ clip.title }</div>
        ))}
        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
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
          h1 {
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
          .podcast {
            display: block;
            text-decoration: none;
            color: #333;
            padding: 15px;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            cursor: pointer;
          }
          .podcast:hover {
            color: #000;
          }
          .podcast h3 {
            margin: 0;
          }
          .podcast .meta {
            color: #666;
            margin-top: 0.5em;
            font-size: 0.8em;
          }
        `}</style>
      </div>
    )
  }
}

export default Channel;