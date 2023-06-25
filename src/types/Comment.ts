import { User } from './User';

export type Comment = {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  User: User;
};

export type CommentId = Comment['id'];
