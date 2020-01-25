import * as actionTypes from '../actions/types';

const initialState = {
  imageSearchTerm: '',
  images: [],
  imagePagination: {},
  userSearchTerm: '',
  users: [],
  userPagination: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_IMAGE:
      if (state.imageSearchTerm !== action.imageSearchTerm) {
        return {
          imageSearchTerm: action.imageSearchTerm,
          images: [...action.images],
          imagePagination: {
            ...action.imagePagination
          }
        };
      } else {
        return {
          ...state,
          images: [...state.images, ...action.images],
          imagePagination: {
            ...state.imagePagination,
            ...action.imagePagination
          }
        };
      }
    case actionTypes.SEARCH_USER:
      if (state.userSearchTerm !== action.userSearchTerm) {
        return {
          userSearchTerm: action.userSearchTerm,
          users: [...action.users],
          userPagination: {
            ...action.userPagination
          }
        };
      } else {
        return {
          ...state,
          users: [...state.users, ...action.users],
          userPagination: {
            ...state.userPagination,
            ...action.userPagination
          }
        };
      }
    default:
      return state;
  }
};
