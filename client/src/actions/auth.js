import { toast } from 'react-toastify';
import GoogleAnalytics from 'react-ga';
import * as actionTypes from '../actions/types';
import axios from '../lib/axios';
import { createWidget } from '../lib/cloudinary';

export const ensureLogin = () => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({
        type: actionTypes.LOGIN_START
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // will throw an exception if response is not successful
      const res = await axios.get('/api/users/me');
      const userId = res.data._id;
      const profilePic = res.data.profilePic;
      const isLoggedIn = true;

      GoogleAnalytics.set({ userId });

      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: { userId, profilePic, isLoggedIn, token }
      });
      createWidget(userId, token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      dispatch({
        type: actionTypes.LOGIN_FAIL
      });
    }
  } catch (e) {
    console.error(e);
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    dispatch({
      type: actionTypes.LOGIN_FAIL
    });
  }
};

export const loginUser = grantCode => async dispatch => {
  try {
    if (!grantCode) {
      throw new Error('cannot login user');
    }

    dispatch({
      type: actionTypes.LOGIN_START
    });

    // will throw an exception if response is not successful
    const res = await axios.post('/api/auth/google', {
      code: grantCode
    });

    const userId = res.data.user._id;
    const profilePic = res.data.user.profilePic;
    const isLoggedIn = true;
    const token = res.data.token;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    localStorage.setItem('token', token);

    GoogleAnalytics.set({ userId });

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: { userId, profilePic, isLoggedIn, token }
    });
    createWidget(userId, token);
  } catch (error) {
    console.error(error);

    if (error.response) {
      if (error.response.status === 401) {
        toast.error('You are not authorized to login');
      } else {
        toast.error('Login service is not available right now');
      }
    } else if (error.request) {
      toast.error('REQUEST TIMEOUT');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request Setup Error', error.message);
    }

    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    dispatch({
      type: actionTypes.LOGIN_FAIL
    });
  }
};

export const logoutUser = () => async dispatch => {
  try {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');

    dispatch({
      type: actionTypes.LOGOUT
    });
  } catch (e) {
    console.error(e);
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};
