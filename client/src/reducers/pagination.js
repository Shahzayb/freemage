import * as actionTypes from '../actions/types';

const initialState = {
  home: {
    curPage: 0,
    hasMorePage: true
  },
  search: {
    curPage: 0,
    hasMorePage: true
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAGINATE_HOME:
      const homePage = { ...state.home, ...action.payload };
      return {
        ...state,
        home: homePage
      };
    default:
      return state;
  }
};
