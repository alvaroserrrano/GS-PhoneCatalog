import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import { Spinner } from './Spinner';
import { MessageBox } from './MessageBox';
export const Profile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails(userInfo._id));
  }, [dispatch, userInfo._id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    //update profile action
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <h1>Your Profile</h1>
        </div>
        {loading ? (
          <Spinner></Spinner>
        ) : error ? (
          <MessageBox variant='danger'></MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                placeholder='Name'
                value={user.name}
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Email'
                value={user.email}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' placeholder='Password' />
            </div>
            <div>
              <label htmlFor='passwordConfirm'>Confirm Password</label>
              <input
                type='password'
                id='passwordConfirm'
                placeholder='Confirm Password'
              />
            </div>
            <div>
              <label htmlFor=''></label>
              <button className='button__primary' type='submit'>
                Update profile
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
