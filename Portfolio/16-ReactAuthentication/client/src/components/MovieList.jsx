import { useState, useEffect } from 'react'
import { Row, Col, Spinner, Alert } from 'react-bootstrap'
import axios from 'axios'
import MovieCard from './MovieCard'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/api/movies')
      setMovies(response.data)
      setLoading(false)
    } catch (err) {
      setError('Error loading movies')
      setLoading(false)
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

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  return (
    <div>
      <h1 className="mb-4">Movies Collection</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {movies.map(movie => (
          <Col key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default MovieList
