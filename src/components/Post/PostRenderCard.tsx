import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { Env } from '../../types/Env';
import { Post, PostId } from '../../types/Post';
import styles from './post.module.css';

type Props = {
  post: Post;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

function PostRenderCard({ post, edit, setEdit }: Props): JSX.Element {
  const [err, setErr] = useState('');
  const [statusComment, setStatusComment] = useState(false);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const { user } = useSelector((store: RootState) => store.user);
  const { comments } = useSelector((store: RootState) => store.comments);

  const env: Env = {
    REACT_APP_URL_DELETEPOST: process.env.REACT_APP_URL_DELETEPOST as string,
    REACT_APP_URL_COMMENTS: process.env.REACT_APP_URL_COMMENTS as string,
    REACT_APP_URL_NEW_COMMENT: process.env.REACT_APP_URL_NEW_COMMENT as string,
  };

  const handleDelete = (id: PostId) => {
    fetch(env.REACT_APP_URL_DELETEPOST!, {
      method: 'DELETE',
      body: JSON.stringify({ postId: post.id }),
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) =>
        data.success
          ? dispatch({ type: 'delete_post', payload: id })
          : data.message
      )
      .then((error) => {
        setErr(error);
      });
  };

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        setErr('');
        clearTimeout(timer);
      }, 2000);
    }
  }, [err]);

  const handleComment = (id: PostId) => {
    fetch(`${env.REACT_APP_URL_COMMENTS}/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'init_comments', payload: data }));
    setStatusComment(!statusComment);
  };

  const newComment = (id: PostId) => {
    fetch(`${env.REACT_APP_URL_NEW_COMMENT}/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        content,
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'add_comment', payload: data }));
    setContent('');
  };

  return (
    <div className="card">
      <div className="card-image">
        <img className={styles.img} src={post.image} alt={post.title} />
        <span className="card-title grey-text text-darken-1">{post.title}</span>
      </div>
      <div className="card-content">
        <p>{post.content}</p>
      </div>
      <div className={statusComment ? styles.active : styles.disable}>
        <div>
          {comments.length > 0
            ? comments.map((el) => (
                <div key={el.id} className={styles.comment}>
                  <div className={styles.left}>{el.content}</div>
                  <div className={styles.right}>{el.User.login}</div>
                </div>
              ))
            : []}
        </div>
        {user && (
          <form className="col s12">
            <div className="input-field col s12 ">
              <input
                onChange={(event) => setContent(event.target.value)}
                value={content}
                type="text"
              />
            </div>
            <div className="card-action">
              <Link onClick={() => newComment(post.id)} to="#">
                Добавить Комментарий
              </Link>
            </div>
          </form>
        )}
      </div>
      <div className="card-action">
        <Link onClick={() => handleComment(post.id)} to="#">
          Комментарии
        </Link>
      </div>
      {user && (
        <div className="card-action">
          {post.user_id === user.id && (
            <>
              <Link onClick={() => setEdit(!edit)} to="#">
                Редактировать
              </Link>
              <Link onClick={() => handleDelete(post.id)} to="#">
                Удалить
              </Link>
            </>
          )}
        </div>
      )}
      {err && <div className="card-content red-text">{err}</div>}
    </div>
  );
}

export default PostRenderCard;
