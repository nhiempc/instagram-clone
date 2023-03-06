import { combineReducers } from '@reduxjs/toolkit';

// reducers
import postReducer from '../slices/post.slice';
import modalReducer from '../slices/modal.slice'

const rootReducer = combineReducers({
  post: postReducer,
  modal: modalReducer
});

export default rootReducer;
