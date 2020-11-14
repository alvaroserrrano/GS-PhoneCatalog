import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import { Spinner } from './Spinner';
import { MessageBox } from './MessageBox';
import '../styles/Login.css';
export const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password do not match');
    } else {
      dispatch(register(name, email, password));
    }
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
            <h1>Create an account</h1>
          </div>
          {loading && <Spinner></Spinner>}
          {error && <MessageBox variant='danger'>{error}</MessageBox>}
          <div>
            <h5>
              <strong>Name</strong>
            </h5>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <br />
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
          <br />
          <div>
            <h5>
              <strong>Confirm password</strong>
            </h5>
            <input
              type='password'
              name='passwordConfirm'
              id='passwordConfirm'
              placeholder='Confirm password'
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor=''>
              <button className='button__primary' type='submit'>
                Register
              </button>
            </label>
          </div>
          <div>
            <label htmlFor=''>
              <div>
                Already have an account?{' '}
                <Link to={`/login?redirect=${redirect}`}>
                  Log in to your account
                </Link>
              </div>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
