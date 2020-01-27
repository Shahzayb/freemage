import { toast } from 'react-toastify';
import * as actionTypes from '../actions/types';
import axios from '../lib/axios';

export const fetchAccount = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/users/${userId}`);
    // console.log(data);
    dispatch({
      type: actionTypes.FETCH_ACCOUNT,
      account: {
        userId: data._id,
        firstName: data.firstName,
        lastName: data.lastName
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateAccount = (firstName, lastName, cb) => async dispatch => {
  try {
    const { data } = await axios.patch(`/api/users/`, {
      firstName,
      lastName
    });

    dispatch({
      type: actionTypes.UPDATE_ACCOUNT,
      account: {
        userId: data._id,
        firstName: data.firstName,
        lastName: data.lastName
      }
    });
    dispatch({ type: actionTypes.RESET_USER });
    toast.success('Account is updated');
    cb();
  } catch (error) {
    console.error(error);
    toast.error('Account updating is failed');
    cb();
  }
};
