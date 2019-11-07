import * as actionTypes from '../actions/types';
import { PAGE_SIZE } from '../config/pagination';
import axios from '../lib/axios';

export const fetchHomeImages = nextPage => async dispatch => {
  try {
    const { data } = await axios.get(
      `/api/images?page=${nextPage}&size=${PAGE_SIZE}`
    );

    dispatch({
      type: actionTypes.FETCH_HOME,
      images: data,
      pagination: {
        curPage: nextPage,
        hasMore: data.length === PAGE_SIZE ? true : false
      }
    });
  } catch (error) {
    console.error(error);
  }
};
