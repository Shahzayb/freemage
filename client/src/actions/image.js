import * as actionTypes from '../actions/types';
import axios from '../lib/axios';

export const fetchImageById = imageId => async dispatch => {
  try {
    const { data: image } = await axios.get(`/api/images/${imageId}`);

    dispatch({
      type: actionTypes.FETCH_IMAGE,
      image
    });

    const { data: user } = await axios.get(`/api/users/${image.ownerId}`);

    dispatch({
      type: actionTypes.FETCH_IMAGE_USER,
      user,
      imageId: image._id
    });
  } catch (e) {
    console.error(e);
  }
};
