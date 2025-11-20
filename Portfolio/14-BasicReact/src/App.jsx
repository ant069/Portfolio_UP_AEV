import React, { useState } from 'react';
import sw from '../public/data/data.js';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
  const [movies, setMovies] = useState(
    sw.map((movie) => ({
      ...movie,
      likes: 0,
      dislikes: 0,
      comments: [],
    }))
  );
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleLike = (index) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie, i) =>
        i === index ? { ...movie, likes: movie.likes + 1 } : movie
      )
    );
  };

  const handleDislike = (index) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie, i) =>
        i === index ? { ...movie, dislikes: movie.dislikes + 1 } : movie
      )
    );
  };

  const handleMoreClick = (index) => {
    setSelectedMovie(selectedMovie === index ? null : index);
  };

  const handleAddComment = (index, name, comment) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie, i) =>
        i === index
          ? {
              ...movie,
              comments: [...movie.comments, { name, comment, date: new Date() }],
            }
          : movie
      )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars Movies Collection</h1>
      </header>
      <main className="movie-grid">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            onLike={() => handleLike(index)}
            onDislike={() => handleDislike(index)}
            onMoreClick={() => handleMoreClick(index)}
          />
        ))}
      </main>
      {selectedMovie !== null && (
        <MovieDetails
          movie={movies[selectedMovie]}
          onAddComment={(name, comment) =>
            handleAddComment(selectedMovie, name, comment)
          }
        />
      )}
    </div>
  );
}

export default App;
