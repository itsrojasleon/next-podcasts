import React from 'react';
import slug from '../helpers/slug';

export default class extends React.Component {
  render() {
    const { podcasts, onClickPodcast, grid } = this.props;
    return <div className={grid ? 'podcast-list' : 'podcast-list-grid'}>
      { podcasts.map((podcast) => (
        <a href={`/${slug(podcast.channel.title)}.${podcast.channel.id}/${slug(podcast.title)}.${podcast.id}`}
          className='podcast' key={podcast.id}
          onClick={ (event) => onClickPodcast(event, podcast) }>
          <div className="description">
            <h3>{ podcast.title }</h3>
            <div className='meta'>
              {Math.ceil(podcast.duration / 60) } minutes
            </div>
          </div>
          <i className="fas fa-angle-right"></i>
        </a>
      )) }
      <style jsx>{`
        .podcast-list {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          over-flow: auto;
        }
        .podcast-list-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 10px;
        }
        .podcast {
          display: block;
          text-decoration: none;
          color: #333;
          padding: 15px;
          cursor: pointer;
          background-color: white;
          box-sizing: border-box;
          margin-bottom: 5px;
          display: grid;
          grid-template-columns: 1fr .2fr;
          justify-items: end;
          align-items: center;
        }
        .podcast .description {
          justify-self: left;
        }
        .podcast:hover {
          color: #000;
        }
        .podcast h3 {
          margin: 0;
        }
        .podcast h3:hover {
          text-decoration: underline;
        }
        .podcast .meta {
          color: #666;
          margin-top: 0.5em;
          font-size: 0.8em;
        }
        .fa-angle-right {
          color: #D42D31;
          transition: .3s;
        }
        .fa-angle-right:hover {
          transform: scale(1.3);
        }
        @media(max-width:768px) {
          .podcast-list-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media(max-width: 481px) {
          .podcast-list-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  }
}