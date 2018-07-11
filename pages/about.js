import React from 'react';

const About = (props) => {
  const logo = '/static/github-logo.png';
  return (
    <div>
      <div className="second-div">
        <img src={logo} alt="Github" />
        <h2>Made in México</h2>
        <p>With love by Rojas</p>
      </div>

      <style jsx>{`
        :global(body) {
          background: rgb(220,220,220);
        }
        .second-div {
          width: 50%;
          margin: auto;
          text-align: center;
          border: 1px solid #ccnextc;
          border-radius: 4px;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

export default About;