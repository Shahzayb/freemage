import * as actionTypes from './types';
import { PAGE_SIZE } from '../config/pagination';
import axios from '../lib/axios';

export const searchImage = (page, searchTerm) => async dispatch => {
  try {
    const { data: images } = await axios.get(
      `/api/images?page=${page}&size=${PAGE_SIZE}&q=${searchTerm}`
    );

    dispatch({
      type: actionTypes.SEARCH_IMAGE,
      searchTerm,
      pagination: {
        curPage: page,
        hasMore: images.length === PAGE_SIZE
      },
      images
    });
  } catch (e) {
    console.error(e);
  }
};
