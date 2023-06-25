import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Env } from '../../types/Env';
import OnePost from '../Post/OnePost';
import styles from './styles.module.css';

function Posts(): JSX.Element {
  const { posts } = useSelector((store: RootState) => store.posts);
  const dispatch = useDispatch();

  const env: Env = {
    REACT_APP_URL_POSTS: process.env.REACT_APP_URL_POSTS as string,
  };

  useEffect(() => {
    fetch(env.REACT_APP_URL_POSTS!)
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'init_posts', payload: data }));
  }, [dispatch, env.REACT_APP_URL_POSTS]);

  return (
    <div className={styles.container}>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              data-id={post.id}
              className={(styles.element, 'row', 'container')}
            >
              <OnePost post={post} />
            </div>
          ))
        ) : (
          <li>pusto</li>
        )}
      </ul>
    </div>
  );
}

export default Posts;
