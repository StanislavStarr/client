import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { Env } from '../../types/Env';

function NavBar(): JSX.Element {
  const { user } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const env: Env = {
    REACT_APP_URL_USER_CHECK: process.env.REACT_APP_URL_USER_CHECK as string,
    REACT_APP_URL_USER_LOGOUT: process.env.REACT_APP_URL_USER_LOGOUT as string,
  };

  useEffect(() => {
    fetch(env.REACT_APP_URL_USER_CHECK!, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'check/user', payload: data }));
    navigate('/posts');
  }, [dispatch, env.REACT_APP_URL_USER_CHECK]);

  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    event.preventDefault();
    fetch(env.REACT_APP_URL_USER_LOGOUT!, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        dispatch({ type: 'del/user', payload: undefined });
      }
    });
    navigate('/posts');
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper black">
          <Link to="/posts" className="brand-logo">
            LOLOLO
          </Link>
          <ul className="right hide-on-med-and-down ">
            {user ? (
              <>
                <li className="brand-logo center">
                  <h5>Привет {user.login}!</h5>
                </li>
                <li>
                  <Link to="/newpost">Новый пост</Link>
                </li>
                <li>
                  <Link onClick={handleLogout} to="/logout">
                    Выход
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register">Регистрация</Link>
                </li>
                <li>
                  <Link to="/login">Вход</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
