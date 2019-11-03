import * as actionTypes from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_IMAGE:
      if (!state[action.searchTerm]) {
        return {
          ...state,
          [action.searchTerm]: {
            pagination: { ...action.pagination },
            images: [...action.images]
          }
        };
      } else {
        return {
          ...state,
          [action.searchTerm]: {
            ...state[action.searchTerm],
            pagination: {
              ...state[action.searchTerm].pagination,
              ...action.pagination
            },
            images: [...state[action.searchTerm].images, ...action.images]
          }
        };
      }
    default:
      return state;
  }
};
