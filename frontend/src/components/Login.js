import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { PromiseProvider } from 'mongoose';
import { Spinner } from './Spinner';
import { MessageBox } from './Message';
export const Login = (props) => {
  //local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);
  return (
    <div>
      <form action='' onSubmit={handleSubmit} className='form'>
        <div>
          <h1>Login</h1>
        </div>
        {loading && <Spinner></Spinner>}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor=''>
            <button className='button__primary' type='submit'>
              Login
            </button>
          </label>
        </div>
        <div>
          <label htmlFor=''>
            <div>
              New Customer? <Link to='/register'>Create a new account</Link>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
};
