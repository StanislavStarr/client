import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Env } from '../../types/Env';
import { Post } from '../../types/Post';

type Props = {
  post: Post;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

function PostRenderEdit({ post, edit, setEdit }: Props): JSX.Element {
  const [image, setImage] = useState(post.image || '');
  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content || '');
  const dispatch = useDispatch();

  const env: Env = {
    REACT_APP_URL_EDITPOST: process.env.REACT_APP_URL_EDITPOST as string,
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setImage(event.target.value);
  };
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };
  const handleContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setContent(event.target.value);
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    fetch(env.REACT_APP_URL_EDITPOST!, {
      method: 'PUT',
      body: JSON.stringify({ postId: post.id, image, title, content }),
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'update_post', payload: data }));
    setEdit(!edit);
  };

  return (
    <div className="row ">
      <div className="col s12 m12">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <div className="input-field col s12 ">
              <input
                onChange={(event) => handleImage(event)}
                type="text"
                defaultValue={post.image}
              />
            </div>
            <div className="input-field col s12 ">
              <input
                onChange={(event) => handleTitle(event)}
                type="text"
                defaultValue={post.title}
              />
            </div>
            <div className="input-field col s12 ">
              <textarea
                onChange={(event) => handleContent(event)}
                defaultValue={post.content}
              />
            </div>
            <p>
              Тут можно изменить свой пост. Написать что-то новое или
              отредактировать старое. И даже ссылку на новую картинку можно
              вставить!
            </p>
          </div>

          <div className="card-action">
            <Link onClick={(event) => handleEdit(event)} to="#">
              Редактировать
            </Link>
            <Link onClick={() => setEdit(!edit)} to="#">
              Вернуться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRenderEdit;
