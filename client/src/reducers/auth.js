import * as actionTypes from '../actions/types';

const initialState = {
  userId: null,
  token: null,
  userStreamToken: null,
  isLoggedIn: false,
  profilePic: null,
  loading: true
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
    case actionTypes.LOGIN_FAIL:
      return { ...initialState, loading: false };
    case actionTypes.LOGOUT:
      return { ...initialState, loading: false };
    default:
      return state;
  }
};
