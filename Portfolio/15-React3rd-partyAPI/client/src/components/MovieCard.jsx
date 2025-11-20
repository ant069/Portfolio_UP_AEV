import { useState, useEffect } from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)

  useEffect(() => {
    fetchLikes()
  }, [movie.id])

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`/api/likes/${movie.id}`)
      setLikes(response.data.likes)
      setDislikes(response.data.dislikes)
    } catch (err) {
      console.error('Error fetching likes:', err)
    }
  }

  const handleLike = async (e) => {
    e.stopPropagation()
    try {
      const response = await axios.post(`/api/likes/${movie.id}/like`)
      setLikes(response.data.likes)
      setDislikes(response.data.dislikes)
    } catch (err) {
      console.error('Error updating like:', err)
    }
  }

  const handleDislike = async (e) => {
    e.stopPropagation()
    try {
      const response = await axios.post(`/api/likes/${movie.id}/dislike`)
      setLikes(response.data.likes)
      setDislikes(response.data.dislikes)
    } catch (err) {
      console.error('Error updating dislike:', err)
    }
  }

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  return (
    <Card className="movie-card" onClick={handleCardClick}>
      <Card.Img 
        variant="top" 
        src={movie.poster} 
        className="movie-poster"
        alt={movie.title}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <Badge bg="secondary" className="me-2">{movie.year}</Badge>
          <Badge bg="info">⭐ {movie.rating}</Badge>
        </Card.Text>
        <Card.Text className="text-muted">
          {movie.genre}
        </Card.Text>
        <div className="like-buttons">
          <Button 
            variant="outline-success" 
            size="sm"
            onClick={handleLike}
          >
            👍 {likes}
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={handleDislike}
          >
            👎 {dislikes}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default MovieCard
