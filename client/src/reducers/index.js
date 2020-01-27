import { combineReducers } from 'redux';
import auth from './auth';
import home from './home';
import images from './images';
import users from './users';
import search from './search';
import account from './account';

export default combineReducers({
  auth,
  home,
  images,
  users,
  search,
  account
});
