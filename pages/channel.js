import React, { Component } from 'react';
import Link from 'next/link';

import Layout from '../components/layout';
import PodcastList from '../components/podcast-list';
import ChannelGrid from '../components/channel-grid';

class Channel extends Component {
  static async getInitialProps({ query, res }) {
    try {
      const idChannel = query.id;
      const URL = `https://api.audioboom.com/channels`;
      const [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`${URL}/${idChannel}`),
        fetch(`${URL}?id=${idChannel}/child_channels`),
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
      res.statusCode = 503;
      return {
        channel: null,
        audio_clips: null,
        channels: null,
        statusCode: 503,
      }
    }
  }
  render() {
    const { channel, audioClips, channels, statusCode } = this.props;
    if (statusCode !== 200) {
      return (
        <Error statusCode={statusCode} />
      )
    }
    return (
      <Layout title={channel.title}>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        <h1>{channel.title}</h1>
        <h2>Series</h2>
        <div className="channels">
          <ChannelGrid channels={channels} />
        </div>
        <h2>Ultimos Podcasts</h2>
        <PodcastList audioClips={audioClips} />
      </Layout>
    )
  }
}

export default Channel;