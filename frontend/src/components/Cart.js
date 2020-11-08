import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import { MessageBox } from './MessageBox';
import { Link } from 'react-router-dom';
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
    <div className='row__top'>
      <div className='col-2'>
        <h1>Your shopping cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to='/'>Homepage</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <div className='row'>
                  <div>
                    <img src={item.imageFileName} className='small' alt='' />
                  </div>
                  <div className='min-30'>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
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
                  </div>
                  <div>${item.price}</div>
                  <div>
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
      <div className='col-1'>
        <div className='card card-body'>
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <button
              className='button__primary'
              type='button'
              disabled={cartItems.length === 0}
              onClick={handleCheckout}
            >
              Proceed to checkout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};
