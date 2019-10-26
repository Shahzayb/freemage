import * as actionTypes from './types';
import axios from '../lib/axios';
import history from '../lib/history';

export const fetchImageById = imageId => async dispatch => {
  try {
    dispatch({
      type: actionTypes.FETCH_IMAGE_START,
      imageId
    });

    const { data: image } = await axios.get(`/api/images/${imageId}`);

    const { data: user } = await axios.get(`/api/users/${image.ownerId}`);

    dispatch({
      type: actionTypes.FETCH_IMAGE,
      user,
      image
    });
  } catch (e) {
    console.error(e);
  }
};

export const toggleImageLike = (imageId, isLikedByMe) => async dispatch => {
  try {
    let res;
    if (isLikedByMe) {
      res = await axios.patch(`/api/images/${imageId}/unlike`);
    } else {
      res = await axios.patch(`/api/images/${imageId}/like`);
    }
    dispatch({
      type: actionTypes.TOGGLE_IMAGE_LIKE,
      imageId,
      likes: res.data.likedBy
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteImage = imageId => async dispatch => {
  try {
    await axios.delete(`/api/images/${imageId}`);
    history.replace('/');

    dispatch({
      type: actionTypes.DELETE_IMAGE,
      imageId
    });
  } catch (e) {
    console.error(e);
  }
};
