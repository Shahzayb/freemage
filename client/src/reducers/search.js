import * as actionTypes from '../actions/types';

const initialState = {
  searchTerm: '',
  images: [],
  pagination: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_IMAGE:
      if (state.searchTerm !== action.searchTerm) {
        return {
          searchTerm: action.searchTerm,
          images: [...action.images],
          pagination: {
            ...action.pagination
          }
        };
      } else {
        return {
          ...state,
          images: [...state.images, ...action.images],
          pagination: {
            ...state.pagination,
            ...action.pagination
          }
        };
      }
    default:
      return state;
  }
};
