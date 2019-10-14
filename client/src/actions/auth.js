import * as actionTypes from '../actions/types';
import axios from '../lib/axios';

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
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: { userId, profilePic, isLoggedIn, token }
      });
    }
  } catch (e) {
    console.error(e);
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

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: { userId, profilePic, isLoggedIn, token }
    });
  } catch (e) {
    console.error(e);
    localStorage.removeItem('token');
  }
};
