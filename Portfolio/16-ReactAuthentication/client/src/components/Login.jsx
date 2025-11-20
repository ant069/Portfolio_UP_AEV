import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { login } from '../redux/actions/authActions';

function Login({ onToggleForm, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData.email, formData.password));
    
    if (result.success && onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h3 className="text-center mb-4">Login</h3>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Loading...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p className="mb-0">
            Don't have an account?{' '}
            <Button variant="link" onClick={onToggleForm} className="p-0">
              Sign up
            </Button>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Login;
