import { Action } from '../../types/PostsAction';
import { State } from '../../types/PostsState';

export const initState: State = {
  posts: [],
};

const reducer = (state: State = initState, action: Action): State => {
  switch (action.type) {
    case 'init_posts':
      return {
        ...state,
        posts: action.payload,
      };
    case 'update_post':
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            return { ...post, ...action.payload };
          } else return post;
        }),
      };
    case 'delete_post':
      return {
        ...state,
        posts: state.posts.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
