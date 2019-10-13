import { combineReducers } from 'redux';
import auth from './auth';
import home from './home';
import pagination from './pagination';

export default combineReducers({
  auth,
  home,
  pagination
});
