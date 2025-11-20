// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGOUT = 'LOGOUT';

export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR';

// Action Creators with Thunk
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });

    const { token, user } = response.data;

    // Store token in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user }
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMessage
    });
    return { success: false, error: errorMessage };
  }
};

// Signup
export const signup = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });

    const response = await axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password
    });

    const { token, user } = response.data;

    // Store token in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { token, user }
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Signup failed';
    dispatch({
      type: SIGNUP_FAILURE,
      payload: errorMessage
    });
    return { success: false, error: errorMessage };
  }
};

// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  dispatch({ type: LOGOUT });
};

// Load user from localStorage
export const loadUser = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, user }
      });
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
};

// Clear error
export const clearError = () => ({
  type: CLEAR_AUTH_ERROR
});
