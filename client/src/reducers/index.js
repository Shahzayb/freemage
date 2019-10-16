import { combineReducers } from 'redux';
import auth from './auth';
import home from './home';
import image from './image';

export default combineReducers({
  auth,
  home,
  images: image
});
