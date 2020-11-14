import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import { MessageBox } from './MessageBox';
import { Link } from 'react-router-dom';
import '../styles/Checkout.css';
export const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleCheckout = () => {
    props.history.push('/login?redirect=shipping');
  };
  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
          alt=''
          className='checkout__ad'
        />
        <h1>Your shopping cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to='/'>Homepage</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <div className='checkoutProduct'>
                  <div>
                    <img
                      src={item.imageFileName}
                      className='checkoutProduct__image'
                      alt=''
                    />
                  </div>
                  <div className='checkoutProduct__info'>
                    <Link
                      to={`/product/${item._id}`}
                      className='checkoutProduct__title'
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div>
                    <select
                      name=''
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item._id, Number(e.target.value)))
                      }
                      id=''
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className='button__primary'
                      onClick={() => {
                        handleRemoveFromCart(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='checkout__right'>
        <div className='card card-body subtotal'>
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <small className='subtotal__gift'>
                <input type='checkbox' name='' id='' /> This order contains a
                gift
              </small>
            </li>
            <li>
              <button
                className='button__primary subtotal__button'
                type='button'
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
