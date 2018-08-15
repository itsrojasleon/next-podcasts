import React, { Component } from 'react';
import Error from './_error';

import Layout from '../components/layout';
import PodcastListWithClick from '../components/podcast-list';
import ChannelGrid from '../components/channel-grid';

class Channel extends Component {
  state = {
    openPodcast: null,
  }
  static async getInitialProps({ query, res }) {
    try {
      const idChannel = query.id;
      const URL = `https://api.audioboom.com/channels`;
      const [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`${URL}/${idChannel}`),
        fetch(`${URL}/${idChannel}/child_channels`),
        fetch(`${URL}/${idChannel}/audio_clips`),
      ]);

      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.statusCode;
        return {
          channel: null,
          audio_clips: null,
          channels: null,
          statusCode: reqChannel.status,
        }
      }

      const { body: { channel } } = await reqChannel.json();
      const { body: { channels } } = await reqSeries.json();
      const { body: { audio_clips } } = await reqAudios.json(); 
      return { channel, audioClips: audio_clips, channels, statusCode: 200 }
    }catch(error) {
      return {
        channel: null,
        audio_clips: null,
        channels: null,
        statusCode: 503,
      }
    }
  }
  openPodcast = (e, podcast) => {
    e.preventDefault();
    this.setState(() => ({
      openPodcast: podcast,
    }));
  }
  render() {
    const { channel, audioClips, channels, statusCode } = this.props;
    const { openPodcast } = this.state;
    if (statusCode !== 200) {
      return (
        <Error statusCode={statusCode} />
      )
    }
    return (
      <Layout title={channel.title}>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        {openPodcast && <div>open Podcast</div>}
        <h1>{channel.title}</h1>
        {channels.length > 0 &&
          <div>
            <h2>Series</h2>
            <ChannelGrid channels={channels} />
          </div>
        }
        <h2>Ultimos Podcasts</h2>
        <PodcastListWithClick 
          podcasts={audioClips} 
          onClickPodcast={this.openPodcast}  
        />
        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
          h1 {
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 15px;
            font-size: 1.2em;
            font-weight: 600;
            margin: 0;
          }
      `}</style>
      </Layout>
    )
  }
}

export default Channel;