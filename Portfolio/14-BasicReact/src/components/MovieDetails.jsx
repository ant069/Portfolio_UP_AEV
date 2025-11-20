import React, { useState } from 'react';
import './MovieDetails.css';

function MovieDetails({ movie, onAddComment }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      onAddComment(name, comment);
      setName('');
      setComment('');
    }
  };

  return (
    <div className="movie-details">
      <div className="details-container">
        <h2 className="details-title">Main Character Details</h2>
        
        <div className="character-info">
          <div className="character-image-container">
            <img
              src={`/images/${movie.best_character.image}`}
              alt={movie.best_character.name}
              className="character-image"
            />
          </div>
          
          <div className="character-content">
            <h3 className="character-name">{movie.best_character.name}</h3>
            <p className="character-affiliation">
              Affiliation: <span className="affiliation-badge">{movie.best_character.affiliation}</span>
            </p>
            <p className="character-bio">{movie.best_character.bio}</p>
          </div>
        </div>

        <div className="comments-section">
          <h3 className="comments-title">Comments</h3>
          
          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows="4"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Add Comment
            </button>
          </form>

          <div className="comments-list">
            {movie.comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              movie.comments.map((c, index) => (
                <div key={index} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{c.name}</span>
                    <span className="comment-date">
                      {new Date(c.date).toLocaleString()}
                    </span>
                  </div>
                  <p className="comment-text">{c.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
