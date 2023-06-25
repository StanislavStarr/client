import { useState } from 'react';
import { Post } from '../../types/Post';
import PostRenderCard from './PostRenderCard';
import PostRenderEdit from './PostRenderEdit';

type Props = {
  post: Post;
};

function OnePost({ post }: Props): JSX.Element {
  const [edit, setEdit] = useState(true);

  return (
    <div className="col s12 m6 edit-form">
      {edit ? (
        <PostRenderCard post={post} edit={edit} setEdit={setEdit} />
      ) : (
        <PostRenderEdit post={post} edit={edit} setEdit={setEdit} />
      )}
    </div>
  );
}

export default OnePost;
