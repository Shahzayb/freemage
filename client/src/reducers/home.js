import * as actionTypes from '../actions/types';

const initialState = {
  pagination: {
    curPage: 0,
    hasMore: true
  },
  images: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HOME:
      return {
        images: [...state.images, ...action.images],
        pagination: { ...state.pagination, ...action.pagination }
      };
    default:
      return state;
  }
};
