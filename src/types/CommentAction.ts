import { Comment } from './Comment';

export type CommentAction =
  | { type: 'init_comments'; payload: Comment[] }
  | { type: 'add_comment'; payload: Comment };
