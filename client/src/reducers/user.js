import * as actionTypes from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_IMAGES:
      const user = { ...state[action.userId] };
      user.images = [...user.images, ...action.images];
      return { ...state, [action.userId]: user };
    case actionTypes.FETCH_USER_LIKES:
      const user = { ...state[action.userId] };
      user.likes = [...user.likes, ...action.likes];
      return { ...state, [action.userId]: user };
    default:
      return state;
  }
};
