import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Button, Badge, Form, ListGroup, Spinner, Alert } from 'react-bootstrap'
import axios from 'axios'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, token, user } = useSelector(state => state.auth)
  const [movie, setMovie] = useState(null)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)

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

  const getAuthHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }

  const handleLike = async () => {
    if (!isAuthenticated) {
      setActionError('Please login to like movies')
      return
    }
    
    try {
      setActionError(null)
      const response = await axios.post(`/api/likes/${id}/like`, {}, getAuthHeaders())
      setLikes(response.data.likes)
      setDislikes(response.data.dislikes)
    } catch (err) {
      console.error('Error updating like:', err)
      setActionError(err.response?.data?.message || 'Error updating like')
    }
  }

  const handleDislike = async () => {
    if (!isAuthenticated) {
      setActionError('Please login to dislike movies')
      return
    }
    
    try {
      setActionError(null)
      const response = await axios.post(`/api/likes/${id}/dislike`, {}, getAuthHeaders())
      setLikes(response.data.likes)
      setDislikes(response.data.dislikes)
    } catch (err) {
      console.error('Error updating dislike:', err)
      setActionError(err.response?.data?.message || 'Error updating dislike')
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    if (!isAuthenticated) {
      setActionError('Please login to add comments')
      return
    }

    try {
      setActionError(null)
      const response = await axios.post('/api/comments', {
        movieId: parseInt(id),
        text: newComment
      }, getAuthHeaders())
      setComments([response.data, ...comments])
      setNewComment('')
    } catch (err) {
      console.error('Error adding comment:', err)
      setActionError(err.response?.data?.message || 'Error adding comment')
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!isAuthenticated) {
      setActionError('Please login to delete comments')
      return
    }

    try {
      setActionError(null)
      await axios.delete(`/api/comments/${commentId}`, getAuthHeaders())
      setComments(comments.filter(c => c._id !== commentId))
    } catch (err) {
      console.error('Error deleting comment:', err)
      setActionError(err.response?.data?.message || 'Error deleting comment')
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
              
              {actionError && (
                <Alert variant="warning" dismissible onClose={() => setActionError(null)} className="mt-3">
                  {actionError}
                </Alert>
              )}

              <div className="like-buttons mt-4">
                <Button
                  variant="outline-success"
                  onClick={handleLike}
                  disabled={!isAuthenticated}
                  title={!isAuthenticated ? 'Login to like' : 'Like this movie'}
                >
                  👍 Like ({likes})
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={handleDislike}
                  disabled={!isAuthenticated}
                  title={!isAuthenticated ? 'Login to dislike' : 'Dislike this movie'}
                  className="ms-2"
                >
                  👎 Dislike ({dislikes})
                </Button>
              </div>
              
              {!isAuthenticated && (
                <Alert variant="info" className="mt-3">
                  Please <strong>login</strong> to like/dislike movies and add comments
                </Alert>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      <div className="comment-section mt-4">
        <h3>Comments ({comments.length})</h3>

        {isAuthenticated ? (
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
        ) : (
          <Alert variant="secondary" className="mb-4">
            Please <strong>login</strong> to add comments
          </Alert>
        )}

        <ListGroup>
          {comments.map(comment => (
            <ListGroup.Item key={comment._id} className="comment-item">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-1">
                    <strong className="me-2">{comment.username}</strong>
                    <small className="text-muted">
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                  </div>
                  <p className="mb-0">{comment.text}</p>
                </div>
                {isAuthenticated && user?.id === comment.userId && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </Button>
                )}
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
