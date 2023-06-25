export type Post = {
  id: number;
  user_id: number;
  image: string;
  title: string;
  content: string;
};

export type PostId = Post['id'];
