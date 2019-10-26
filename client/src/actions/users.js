import * as actionTypes from './types';
import axios from '../lib/axios';
import { PAGE_SIZE } from '../config/pagination';

export const fetchUser = userId => async dispatch => {
  try {
    const { data: user } = await axios.get(`/api/users/${userId}`);

    dispatch({
      type: actionTypes.FETCH_USER,
      user
    });
  } catch (e) {
    console.error(e);
  }
};

export const fetchUserImages = (nextPage, userId) => async dispatch => {
  try {
    const { data } = await axios.get(
      `/api/users/${userId}/images?page=${nextPage}&size=${PAGE_SIZE}`
    );

    dispatch({
      type: actionTypes.FETCH_USER_IMAGES,
      userId,
      images: data,
      pagination: {
        curPage: nextPage,
        hasMore: data.length === PAGE_SIZE ? true : false
      }
    });
  } catch (e) {
    console.error(e);
  }
};
export const fetchUserLikedImages = (nextPage, userId) => async dispatch => {
  try {
    const { data } = await axios.get(
      `/api/users/${userId}/likes?page=${nextPage}&size=${PAGE_SIZE}`
    );

    dispatch({
      type: actionTypes.FETCH_USER_LIKES,
      userId,
      images: data,
      pagination: {
        curPage: nextPage,
        hasMore: data.length === PAGE_SIZE ? true : false
      }
    });
  } catch (e) {
    console.error(e);
  }
};
