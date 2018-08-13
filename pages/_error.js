import React, { Component } from 'react';

class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return {
      statusCode,
    }
  }
  render() {
    return (
      <p>{this.props.statusCode 
      ? `Error ${this.props.statusCode} ocurred on Server`
      : 'An error ocurred on Client'
      }</p>
    );
  }
}
export default Error;