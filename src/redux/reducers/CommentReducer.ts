import { CommentAction } from '../../types/CommentAction';
import { CommentState } from '../../types/CommentState';

const initState: CommentState = {
  comments: [],
};

const reducer = (
  state: CommentState = initState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case 'init_comments':
      return { ...state, comments: action.payload };
    case 'add_comment':
      return { ...state, comments: [...state.comments, action.payload] };
    default:
      return state;
  }
};

export default reducer;
