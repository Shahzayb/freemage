import * as actionTypes from '../actions/types';

const initialState = {
  userId: null,
  token: null,
  isLoggedIn: null,
  profilePic: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    default:
      return state;
  }
};
