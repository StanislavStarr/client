import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Env } from '../../types/Env';

function NewPost(): JSX.Element {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const env: Env = {
    REACT_APP_URL_NEWPOST: process.env.REACT_APP_URL_NEWPOST as string,
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newPost = {
      image,
      title,
      content,
    };
    fetch(env.REACT_APP_URL_NEWPOST!, {
      method: 'POST',
      body: JSON.stringify({ newPost }),
      headers: { 'content-type': 'application/json' },
    });
    navigate('/posts');
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="register-form">
        <div className="mb-3">
          <label className="form-label" />
          <input
            onChange={(event) => handleImage(event)}
            value={image}
            type="text"
            className="form-control"
            placeholder="Добавь фотку"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" />
          <input
            onChange={(event) => handleTitle(event)}
            value={title}
            type="text"
            className="form-control"
            placeholder="Напиши название"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" />
          <textarea
            onChange={(event) => handleContent(event)}
            value={content}
            className="form-control"
            placeholder="Расскажи об этом"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default NewPost;
