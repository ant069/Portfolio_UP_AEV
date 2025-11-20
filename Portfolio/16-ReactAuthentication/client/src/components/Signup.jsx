import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { signup } from '../redux/actions/authActions';

function Signup({ onToggleForm, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    const result = await dispatch(signup(formData.username, formData.email, formData.password));
    
    if (result.success && onSignupSuccess) {
      onSignupSuccess();
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h3 className="text-center mb-4">Sign Up</h3>
        
        {(error || validationError) && (
          <Alert variant="danger">{validationError || error}</Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              minLength={3}
            />
          </Form.Group>

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
              placeholder="Password (min 6 characters)"
              required
              minLength={6}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
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
              'Sign Up'
            )}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p className="mb-0">
            Already have an account?{' '}
            <Button variant="link" onClick={onToggleForm} className="p-0">
              Login
            </Button>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Signup;
