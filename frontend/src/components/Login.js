import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { Spinner } from './Spinner';
import { MessageBox } from './MessageBox';
import '../styles/Login.css';
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
    <div className='login'>
      <Link to='/'>
        <img
          className='login__logo'
          src='http://pngimg.com/uploads/phone/phone_PNG48959.png'
          alt=''
        />
      </Link>
      <div className='login__container'>
        <form action='' onSubmit={handleSubmit} className='form'>
          <div>
            <h1>Login</h1>
          </div>
          {loading && <Spinner></Spinner>}
          {error && <MessageBox variant='danger'>{error}</MessageBox>}
          <div>
            <h5>
              <strong>Email</strong>
            </h5>
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
          <br />
          <div>
            <h5>
              <strong>Password</strong>
            </h5>
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
        </form>
        <p>
          By signing-in you agree to our Conditions of Use & Sale. Please see
          our Privacy Notice, our Cookies Notice and our Interest-Based Ads
        </p>
        <br />
        <div>
          <label htmlFor=''>
            <div>
              New Customer?{' '}
              <Link to={`/register?redirect=${redirect}`}>
                <strong> Create a new account</strong>
              </Link>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
