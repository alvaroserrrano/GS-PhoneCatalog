import React from 'react';
import '../styles/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
export const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className='header'>
      <Link to='/'>
        <img
          className='header__logo'
          src='http://pngimg.com/uploads/phone/phone_PNG48959.png'
          alt='guidesmiht logo'
        />
      </Link>
      <div className='header__search'>
        <input type='text' className='header__searchInput' />
        <SearchIcon className='header__searchIcon' />
      </div>
      <div className='header__nav'>
        {userInfo ? (
          <Link to='#logout' onClick={handleLogout}>
            <div className='header__option'>
              <span className='header__optionLineOne'></span>
              <span className='header__optionLineTwo'>Logout</span>
            </div>
          </Link>
        ) : (
          <Link to='/login'>
            <div className='header__option'>
              <span className='header__optionLineOne'></span>
              <span className='header__optionLineTwo'>Login</span>
            </div>
          </Link>
        )}
        <Link to='/orders'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Your</span>
            <span className='header__optionLineTwo'>Orders</span>
          </div>
        </Link>
        <Link to='/cart'>
          <div className='header__optionCart'>
            <ShoppingBasketIcon />
            {cartItems.length > 0 && (
              <span className='header__optionLineTwo header__basketCount'>
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
