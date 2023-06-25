import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer';
import UserReducer from './UserReducer';
import CommentReducer from './CommentReducer';

export const rootReducer = combineReducers({
  posts: PostsReducer,
  user: UserReducer,
  comments: CommentReducer,
});
