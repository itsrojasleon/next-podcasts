import React from 'react';

const Home = (props) => {
  const logo = '/static/platzi-logo.png';
  return (
    <div>
      <h1>Hello World!</h1>
      <p>Next Course</p>
      <img src={logo} alt={`Platzi`} />
      <style jsx>{`
        h1 {
          color: red;
        }
        p {
          color: yellow;
        }
        img {
          max-width: 50%;
          display: block;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}

export default Home;