import React, { Component } from 'react';
import 'isomorphic-fetch';

import Layout from '../components/layout';
import ChannelGrid from '../components/channel-grid';
// Prefetch juts works in production

// Prefetch just works with html, css and javascript...
// ¡Doesn't work with getInitialProps.

class Home extends Component {
  static async getInitialProps({ res }) {
    try {
      const URL = 'https://api.audioboom.com/channels/recommended';
      const request = await fetch(`${URL}`);
      const { body } = await request.json();
      return {
        channels: body,
        statusCode: 200,
      }
    }catch(error) {
      res.statusCode = 503;
      return {
        channels: null,
        statusCode: 503,
      }
    }
  }
  render() {
    const logo = '/static/platzi-logo.png';
    const { channels, statusCode } = this.props;
    if (statusCode !== 200) {
      return (
        <Error statusCode={statusCode} />
      )
    }
    return (
      <Layout title="Podcasts">
        <ChannelGrid box={true} channels={channels} />
      </Layout>
    )
  }
}

export default Home;