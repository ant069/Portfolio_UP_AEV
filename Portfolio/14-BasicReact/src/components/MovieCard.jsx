import React, { useState } from 'react';
import './MovieCard.css';

function MovieCard({ movie, onLike, onDislike, onMoreClick }) {
  const [isHovered, setIsHovered] = useState(false);

  // Map affiliations to logo files and colors
  const affiliationMap = {
    Jedi: { logo: 'jedi.png', color: 'blue' },
    Sith: { logo: 'sith.png', color: 'red' },
    Empire: { logo: 'empire.png', color: 'red' },
    Rebellion: { logo: 'rebel.png', color: 'blue' },
  };

  const affiliation = affiliationMap[movie.best_character.affiliation] || {
    logo: 'jedi.png',
    color: 'blue',
  };

  return (
    <div
      className={`movie-card ${affiliation.color}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="movie-card-image-container">
        <img
          src={
            isHovered
              ? `/images/${affiliation.logo}`
              : `/images/${movie.poster}`
          }
          alt={movie.title}
          className="movie-card-image"
        />
      </div>
      <div className="movie-card-content">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-year">Episode {movie.episode} - {movie.year}</p>
        
        <div className="movie-actions">
          <div className="like-dislike">
            <button className="like-btn" onClick={onLike}>
              👍 {movie.likes}
            </button>
            <button className="dislike-btn" onClick={onDislike}>
              👎 {movie.dislikes}
            </button>
          </div>
          <button className="more-btn" onClick={onMoreClick}>
            More...
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
