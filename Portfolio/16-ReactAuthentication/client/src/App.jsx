import { Routes, Route } from 'react-router-dom'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import AuthModal from './components/AuthModal'
import { loadUser, logout } from './redux/actions/authActions'
import './App.css'

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="/">🎬 Movie App</Navbar.Brand>
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-3">
                  Welcome, <strong>{user?.username}</strong>
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline-light" size="sm" onClick={() => setShowAuthModal(true)}>
                Login / Sign Up
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Container>

      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)} 
      />
    </>
  )
}

export default App