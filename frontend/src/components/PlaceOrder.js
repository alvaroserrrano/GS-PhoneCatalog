import React, { useEffect } from 'react';
import { CheckoutSteps } from './CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { CREATE_ORDER_RESET } from '../constants/orderConstants';
import { MessageBox } from './MessageBox';
import { Spinner } from './Spinner';
export const PlaceOrder = (props) => {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const convertToPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = convertToPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice =
    cart.itemsPrice > 100 ? convertToPrice(0) : convertToPrice(10);
  cart.taxPrice = convertToPrice(0.21 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const handleSubmit = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/orders/${order._id}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [success, order, dispatch, props.history]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className='col-2'>
        <ul>
          <li>
            <div className='card card-body'>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {cart.shippingAddress.fullName}
                <br />
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.zipCode}, {cart.shippingAddress.country}
              </p>
            </div>
          </li>
          <li>
            <div className='card card-body'>
              <h2>Payment</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
                <br />
              </p>
            </div>
          </li>
          <li>
            <div className='card card-body'>
              <h2>Order Items</h2>
              <ul>
                {cart.cartItems.map((item) => (
                  <li key={item.product}>
                    <div className='row'>
                      <div>
                        <img
                          src={item.imageFileName}
                          alt={item.name}
                          className='small'
                        />
                      </div>
                      <div className='min-30'>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className='col-1'>
        <div className='card card-body'>
          <ul>
            <li>
              <h2>Order Summary</h2>
            </li>
            <li>
              <div className='row'>
                <div>Products</div>
                <div>${cart.itemsPrice.toFixed(2)}</div>
              </div>
              <div className='row'>
                <div>Shipping</div>
                <div>${cart.shippingPrice.toFixed(2)}</div>
              </div>
              <div className='row'>
                <div>Taxes</div>
                <div>${cart.taxPrice.toFixed(2)}</div>
              </div>
              <div className='row'>
                <div>
                  <strong>Total</strong>
                </div>
                <div>${cart.totalPrice.toFixed(2)}</div>
              </div>
            </li>
            <li>
              <button
                type='button'
                className=' button__primary'
                onClick={handleSubmit}
                disabled={cart.cartItems.length === 0}
              >
                Place Order
              </button>
            </li>
            {loading && <Spinner></Spinner>}
            {error && <MessageBox variant='danger'>{error}</MessageBox>}
          </ul>
        </div>
      </div>
    </div>
  );
};
