import * as actionTypes from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HOME:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
