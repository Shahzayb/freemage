import * as actionTypes from '../actions/types';

const initialState = {};

/**
   {
  userId: {
    image: {},
    user: {}
  }
};
 */

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_IMAGE:
      return {
        ...state,
        [action.image._id]: { image: action.image }
      };
    case actionTypes.FETCH_IMAGE_USER:
      return {
        ...state,
        [action.imageId]: {
          ...state[action.imageId],
          user: {
            ...action.user
          }
        }
      };
    default:
      return state;
  }
};
