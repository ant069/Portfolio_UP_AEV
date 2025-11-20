import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import authMiddleware from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moviesdb')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.log('⚠️  MongoDB connection error:', err.message);
    console.log('💡 El servidor seguirá funcionando pero los comentarios y likes no se guardarán.');
    console.log('💡 Para usar MongoDB Atlas (gratis): https://www.mongodb.com/cloud/atlas');
  });

// Comment Schema
const commentSchema = new mongoose.Schema({
  movieId: { type: Number, required: true },
  text: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

// Like/Dislike Schema
const likeSchema = new mongoose.Schema({
  movieId: { type: Number, required: true, unique: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
});

const Like = mongoose.model('Like', likeSchema);

// Movies data (simulating API)
const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    genre: "Drama",
    rating: 9.3,
    poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    genre: "Crime, Drama",
    rating: 9.2,
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    genre: "Action, Crime, Drama",
    rating: 9.0,
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    genre: "Crime, Drama",
    rating: 8.9,
    poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    genre: "Drama, Romance",
    rating: 8.8,
    poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man."
  },
  {
    id: 6,
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: "Action, Sci-Fi, Thriller",
    rating: 8.8,
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea."
  }
];

// Auth Routes
app.use('/api/auth', authRoutes);

// Routes

// Get all movies (Public)
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// Get single movie (Public)
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.json(movie);
});

// Get comments for a movie (Public)
app.get('/api/comments/:movieId', async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: parseInt(req.params.movieId) }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment (Protected - requires authentication)
app.post('/api/comments', authMiddleware, async (req, res) => {
  try {
    const comment = new Comment({
      movieId: req.body.movieId,
      text: req.body.text,
      username: req.user.username,
      userId: req.user.userId
    });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete comment (Protected - requires authentication)
app.delete('/api/comments/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get likes/dislikes for a movie
app.get('/api/likes/:movieId', async (req, res) => {
  try {
    let like = await Like.findOne({ movieId: parseInt(req.params.movieId) });
    if (!like) {
      like = new Like({ movieId: parseInt(req.params.movieId), likes: 0, dislikes: 0 });
      await like.save();
    }
    res.json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update likes/dislikes (Protected - requires authentication)
app.post('/api/likes/:movieId/:action', authMiddleware, async (req, res) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const action = req.params.action; // 'like' or 'dislike'

    let like = await Like.findOne({ movieId });
    if (!like) {
      like = new Like({ movieId, likes: 0, dislikes: 0 });
    }

    if (action === 'like') {
      like.likes += 1;
    } else if (action === 'dislike') {
      like.dislikes += 1;
    }

    await like.save();
    res.json(like);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
