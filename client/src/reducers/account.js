import * as actionTypes from '../actions/types';

const initialState = {
  userId: null,
  firstName: null,
  lastName: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACCOUNT:
      return {
        ...state,
        ...action.account
      };
    case actionTypes.UPDATE_ACCOUNT:
      return {
        ...state,
        ...action.account
      };

    default:
      return state;
  }
};
