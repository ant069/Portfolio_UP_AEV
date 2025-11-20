import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Badge, Form, ListGroup, Spinner, Alert } from 'react-bootstrap'
import axios from 'axios'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMovieData()
  }, [id])

  const fetchMovieData = async () => {
    try {
      const [movieRes, likesRes, commentsRes] = await Promise.all([
        axios.get(`/api/movies/${id}`),
        axios.get(`/api/likes/${id}`),
        axios.get(`/api/comments/${id}`)
      ])
      
      setMovie(movieRes.data)
      setLikes(likesRes.data.likes)
      setDislikes(likesRes.data.dislikes)
      setComments(commentsRes.data)
      setLoading(false)
    } catch (err) {
      setError('Error loading movie details')
      setLoading(false)
    }
  }

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/likes/${id}/like`)
      setLikes(response.data.likes)
      setDislikes(response.data.dislikes)
    } catch (err) {
      console.error('Error updating like:', err)
    }
  }

  const handleDislike = async () => {
    try {
      const response = await axios.post(`/api/likes/${id}/dislike`)
      setLikes(response.data.likes)
      setDislikes(response.data.dislikes)
    } catch (err) {
      console.error('Error updating dislike:', err)
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      const response = await axios.post('/api/comments', {
        movieId: parseInt(id),
        text: newComment
      })
      setComments([response.data, ...comments])
      setNewComment('')
    } catch (err) {
      console.error('Error adding comment:', err)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`)
      setComments(comments.filter(c => c._id !== commentId))
    } catch (err) {
      console.error('Error deleting comment:', err)
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  if (error || !movie) {
    return <Alert variant="danger">{error || 'Movie not found'}</Alert>
  }

  return (
    <div>
      <Button 
        variant="secondary" 
        className="mb-3"
        onClick={() => navigate('/')}
      >
        ← Back to Movies
      </Button>

      <Card>
        <Card.Body>
          <div className="row">
            <div className="col-md-4">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <h1>{movie.title}</h1>
              <div className="mb-3">
                <Badge bg="secondary" className="me-2">{movie.year}</Badge>
                <Badge bg="info">⭐ {movie.rating}</Badge>
              </div>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p className="lead">{movie.description}</p>
              
              <div className="like-buttons mt-4">
                <Button 
                  variant="outline-success"
                  onClick={handleLike}
                >
                  👍 Like ({likes})
                </Button>
                <Button 
                  variant="outline-danger"
                  onClick={handleDislike}
                >
                  👎 Dislike ({dislikes})
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <div className="comment-section mt-4">
        <h3>Comments ({comments.length})</h3>
        
        <Form onSubmit={handleSubmitComment} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Comment
          </Button>
        </Form>

        <ListGroup>
          {comments.map(comment => (
            <ListGroup.Item key={comment._id} className="comment-item">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <p className="mb-1">{comment.text}</p>
                  <small className="comment-date">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </div>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
          {comments.length === 0 && (
            <ListGroup.Item className="text-center text-muted">
              No comments yet. Be the first to comment!
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </div>
  )
}

export default MovieDetail
