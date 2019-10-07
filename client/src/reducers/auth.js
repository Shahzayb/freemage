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
    case actionTypes.ENSURE_LOGIN:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.START_LOGIN_PROCESS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        ...action.payload,
        loading: false
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...initialState,
        error: action.error
      };
    default:
      return state;
  }
};
