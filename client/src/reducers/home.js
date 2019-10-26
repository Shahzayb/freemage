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
    case actionTypes.DELETE_IMAGE:
      const updateImages = state.images.filter(
        image => image._id !== action.imageId
      );
      return {
        images: updateImages,
        pagination: { ...state.pagination }
      };
    default:
      return state;
  }
};
