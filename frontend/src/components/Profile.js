import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';
import { Spinner } from './Spinner';
import { MessageBox } from './MessageBox';
import { updateProfile } from '../actions/userActions';
import { PROFILE_RESET } from '../constants/userConstants';
export const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: PROFILE_RESET });
      dispatch(getUserDetails(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    //update profile action
    if (password !== passwordConfirm) {
      alert('Passwords do not match');
    } else {
      dispatch(updateProfile({ userId: user._id, name, email, password }));
    }
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
            {loadingUpdate && <Spinner></Spinner>}
            {errorUpdate && (
              <MessageBox variant='danger'>{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant='success'>
                Profile successfully updated
              </MessageBox>
            )}
            <div>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='passwordConfirm'>Confirm Password</label>
              <input
                type='password'
                id='passwordConfirm'
                placeholder='Confirm Password'
                onChange={setPasswordConfirm(e.target.value)}
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
