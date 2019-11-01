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

export const toggleImageLike = (
  imageId,
  isLikedByMe,
  userId
) => async dispatch => {
  try {
    if (isLikedByMe) {
      dispatch({
        type: actionTypes.UNLIKE_IMAGE,
        imageId,
        userId
      });
      await axios.patch(`/api/images/${imageId}/unlike`);
    } else {
      dispatch({
        type: actionTypes.LIKE_IMAGE,
        imageId,
        userId
      });
      await axios.patch(`/api/images/${imageId}/like`);
    }
    dispatch({
      type: actionTypes.RESET_USER_LIKES,
      userId
    });
  } catch (e) {
    console.error(e);
    // in case of any error: undo like / unlike & show error to user
    if (!isLikedByMe) {
      dispatch({
        type: actionTypes.UNLIKE_IMAGE,
        imageId,
        userId
      });
    } else {
      dispatch({
        type: actionTypes.LIKE_IMAGE,
        imageId,
        userId
      });
    }
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
