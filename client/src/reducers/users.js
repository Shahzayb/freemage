import * as actionTypes from '../actions/types';

const initialState = {};

// {
//   userId: {
//     imagesPage: {
//       images: [];
//       pagination: {
//         curPage: 0,
//         hasMore: true,
//       }
//     }
//   }
// }

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        [action.user._id]: {
          ...action.user,
          imagesPage: {
            images: [],
            pagination: {
              curPage: 0,
              hasMore: true
            }
          },
          likesPage: {
            images: [],
            pagination: {
              curPage: 0,
              hasMore: true
            }
          }
        }
      };
    case actionTypes.FETCH_USER_IMAGES:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          imagesPage: {
            images: [
              ...state[action.userId].imagesPage.images,
              ...action.images
            ],
            pagination: {
              ...state[action.userId].imagesPage.pagination,
              ...action.pagination
            }
          },
          likesPage: {
            images: [...state[action.userId].likesPage.images],
            pagination: {
              ...state[action.userId].likesPage.pagination
            }
          }
        }
      };
    case actionTypes.FETCH_USER_LIKES:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          imagesPage: {
            images: [...state[action.userId].imagesPage.images],
            pagination: {
              ...state[action.userId].imagesPage.pagination
            }
          },
          likesPage: {
            images: [
              ...state[action.userId].likesPage.images,
              ...action.images
            ],
            pagination: {
              ...state[action.userId].likesPage.pagination,
              ...action.pagination
            }
          }
        }
      };
    default:
      return state;
  }
};
