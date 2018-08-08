import React, { Component } from 'react';
import 'isomorphic-fetch';
import Link from 'next/link';

import Layout from '../components/layout';
import ChannelGrid from '../components/channel-grid';
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
      <Layout title="Podcasts">
        <ChannelGrid channels={channels} />
      </Layout>
    )
  }
}

export default Home;