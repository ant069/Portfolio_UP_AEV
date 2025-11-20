import { Routes, Route } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import './App.css'

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/">🎬 Movie App</Navbar.Brand>
        </Container>
      </Navbar>
      
      <Container>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
