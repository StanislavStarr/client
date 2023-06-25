import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Env } from '../../types/Env';

function Login(): JSX.Element {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const env: Env = {
    REACT_APP_URL_LOGIN: process.env.REACT_APP_URL_LOGIN as string,
  };

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(env.REACT_APP_URL_LOGIN!, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        dispatch({ type: 'add/user', payload: data });
        console.log(dispatch({ type: 'add/user', payload: data }));
      })
      .then(() => navigate('/posts'));
  };

  return (
    <div className="row container">
      <form onSubmit={handleSubmit} className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={(event) => handleLogin(event)}
              value={login}
              placeholder="Login"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              onChange={(event) => handlePassword(event)}
              value={password}
              placeholder="Password"
              type="password"
              className="validate"
            />
          </div>
        </div>
        <button type="submit" className="waves-effect waves-light btn">
          button
        </button>
      </form>
    </div>
  );
}

export default Login;
