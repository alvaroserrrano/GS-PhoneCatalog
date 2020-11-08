import React from 'react';
import '../styles/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';

export const Header = () => (
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
      <div className='header__option'>
        <span className='header__optionLineOne'></span>
        <span className='header__optionLineTwo'>Sign in</span>
      </div>
      <Link to='/orders'>
        <div className='header__option'>
          <span className='header__optionLineOne'>Your</span>
          <span className='header__optionLineTwo'>Orders</span>
        </div>
      </Link>
      <Link to='/checkout'>
        <div className='header__optionCart'>
          <ShoppingBasketIcon />
          <span className='header__optionLineTwo header__basketCount'>1</span>
        </div>
      </Link>
    </div>
  </div>
);
