import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signin',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    //persist (save) the JWT token data in the localStorage so it doesn't go away
    //when you refresh the page or restart the server
    localStorage.setItem('token', response.data.token);
    //callback function is called once the user has successfully signed up
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signup',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    //persist (save) the JWT token data in the localStorage so it doesn't go away
    //when you refresh the page or restart the server
    localStorage.setItem('token', response.data.token);
    //callback function is called once the user has successfully signed up
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

//remove the JWT token in localStorage and return an empty AUTH_USER reducers
export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
