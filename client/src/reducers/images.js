import * as actionTypes from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_IMAGE_START:
      return {
        ...state,
        [action.imageId]: {
          ...(state[action.imageId] ? state[action.imageId] : {}),
          loading: true
        }
      };
    case actionTypes.FETCH_IMAGE:
      return {
        ...state,
        [action.image._id]: {
          ...action.image,
          loading: false,
          user: {
            ...action.user
          }
        }
      };
    case actionTypes.LIKE_IMAGE:
      return {
        ...state,
        [action.imageId]: {
          ...state[action.imageId],
          likedBy: [...state[action.imageId].likedBy, action.userId]
        }
      };
    case actionTypes.UNLIKE_IMAGE:
      return {
        ...state,
        [action.imageId]: {
          ...state[action.imageId],
          likedBy: state[action.imageId].likedBy.filter(
            userId => userId !== action.userId
          )
        }
      };
    case actionTypes.DELETE_IMAGE:
      const newState = {
        ...state
      };
      delete newState[action.imageId];
      return newState;
    default:
      return state;
  }
};
