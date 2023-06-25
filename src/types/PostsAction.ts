import { Post, PostId } from './Post';

export type Action =
  | { type: 'init_posts'; payload: Post[] }
  | { type: 'update_post'; payload: Partial<Post> }
  | { type: 'delete_post'; payload: PostId };
