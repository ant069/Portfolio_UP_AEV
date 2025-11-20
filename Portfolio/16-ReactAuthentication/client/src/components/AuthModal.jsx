import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';

function AuthModal({ show, onHide }) {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleSuccess = () => {
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="p-4">
        {showLogin ? (
          <Login onToggleForm={toggleForm} onLoginSuccess={handleSuccess} />
        ) : (
          <Signup onToggleForm={toggleForm} onSignupSuccess={handleSuccess} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
