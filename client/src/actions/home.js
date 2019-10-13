import * as actionTypes from '../actions/types';
import { PAGE_SIZE } from '../config/pagination';
import axios from '../lib/axios';

export const fetchHomeImages = nextPage => async dispatch => {
  try {
    // let data = [];

    // if (Math.random() < 0.9) {
    //   for (let i = 0; i < PAGE_SIZE; i++) {
    //     data.push({
    //       _id: Math.random() * 100000,
    //       src: `https://source.unsplash.com/random?sig=${Math.random() * 1000}`
    //     });
    //   }
    // }

    const { data } = await axios.get(
      `/api/images?page=${nextPage}&size=${PAGE_SIZE}`
    );

    if (data.length) {
      dispatch({
        type: actionTypes.FETCH_HOME,
        payload: data
      });
    }

    dispatch({
      type: actionTypes.PAGINATE_HOME,
      payload: {
        curPage: data.length ? nextPage : nextPage - 1,
        hasMorePage: data.length ? true : false
      }
    });
  } catch (e) {
    console.error(e);

    dispatch({
      type: actionTypes.PAGINATE_HOME,
      payload: {
        curPage: nextPage - 1,
        hasMorePage: false
      }
    });
  }
};
