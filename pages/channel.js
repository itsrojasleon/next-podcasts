import React, { Component } from 'react';
import Error from './_error';

import Layout from '../components/layout';
import PodcastListWithClick from '../components/podcast-list-with-click';
import ChannelGrid from '../components/channel-grid';
import PodcastPlayer from '../components/podcast-player';

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
  closePodcast = (e) => {
    e.preventDefault();
    this.setState(() => ({
      openPodcast: null,
    }))
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
      <Layout title={channel.title} back={true}>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        {openPodcast && (
          <div className="modal">
            <PodcastPlayer clip={openPodcast} onClose={this.closePodcast} />
          </div>
        )}
        <h1>{channel.title}</h1>
        <div className="podcasts-and-series">
          {channels.length > 0 &&
            <div className="category">
              <h2>Series</h2>
              <ChannelGrid channels={channels} />
            </div>
          }
          <div className="category">
            <h2>Ultimos Podcasts</h2>
            <PodcastListWithClick 
              podcasts={audioClips} 
              onClickPodcast={this.openPodcast}  
            />
          </div>
        </div>
        <style jsx>{`
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
          .podcasts-and-series {
            display: grid;
            width: 80%;
            margin: auto;
            grid-template-columns: 2fr 1fr;
            grid-template-rows: 1fr;
          }
          .category {
            display: flex;
            flex-direction: column;
            height: 100%;
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
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: black;
            z-index: 999;
          }
      `}</style>
      </Layout>
    )
  }
}

export default Channel;