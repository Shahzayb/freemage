import * as actionTypes from './types';
import { PAGE_SIZE } from '../config/pagination';
import axios from '../lib/axios';

export const searchImage = (page, imageSearchTerm) => async dispatch => {
  try {
    const { data: images } = await axios.get(
      `/api/images?page=${page}&size=${PAGE_SIZE}&q=${imageSearchTerm}`
    );

    dispatch({
      type: actionTypes.SEARCH_IMAGE,
      imageSearchTerm,
      imagePagination: {
        curPage: page,
        hasMore: images.length === PAGE_SIZE
      },
      images
    });
  } catch (e) {
    console.error(e);
  }
};

export const searchUser = (page, userSearchTerm) => async dispatch => {
  try {
    const { data: users } = await axios.get(
      `/api/users?page=${page}&size=${PAGE_SIZE}&q=${userSearchTerm}`
    );

    dispatch({
      type: actionTypes.SEARCH_USER,
      userSearchTerm,
      userPagination: {
        curPage: page,
        hasMore: users.length === PAGE_SIZE
      },
      users
    });
  } catch (e) {
    console.error(e);
  }
};
