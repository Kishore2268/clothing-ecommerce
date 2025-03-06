import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT
} from './ActionTypes';
import api, { API_BASE_URL } from '../../config/api';

// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error });

export const register = userData => async dispatch => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      await dispatch(getUser(user.jwt)); // Fetch user details after registration
    }
    dispatch(registerSuccess(user));
    return user;
  } catch (error) {
    dispatch(registerFailure(error.message));
    throw error;
  }
};

// Login action creators
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

export const login = userData => async dispatch => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      await dispatch(getUser(user.jwt)); // Fetch user details after login
    }
    dispatch(loginSuccess(user));
    return user;
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

// Get user from token
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const user = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      return user;
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
      throw error;
    }
  };
};

// Check authentication status
export const checkAuthStatus = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        await dispatch(getUser(token));
      } catch (error) {
        dispatch(logout());
      }
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT });
  };
};
