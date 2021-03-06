import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from './Spinner';
import { MessageBox } from './MessageBox';
import { detailsOrder, payOrder } from '../actions/orderActions';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { PAY_ORDER_RESET } from '../constants/orderConstants';
export const Order = (props) => {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector((state) => state.orderPay);
  const {
    error: errorPay,
    loading: loadingPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await Axios.get('/api/v1/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: PAY_ORDER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, order]);
  const handlePaymentSuccess = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  return loading ? (
    <Spinner></Spinner>
  ) : error ? (
    <MessageBox variant='danger'></MessageBox>
  ) : (
    <div className='order'>
      <h1>Order</h1>
      <div className='row-top '>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Order details</h2>
                <p>
                  <strong>Name:</strong>
                  {order.shippingAddress.fullName} <br />
                  <strong>Address </strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},{' '}
                  {order.shippingAddress.zipCode},{' '}
                  {order.shippingAddress.country}
                </p>
                <br />
                <p className='order__id'>
                  <strong> Order id: </strong>
                  {order._id}
                </p>
                <br />
                {order.isDelivered ? (
                  <MessageBox variant='success'>
                    Delivered on {order.deliveredOn}
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>Not delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox className='success'>
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox className='danger'>Not paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Order items</h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = $ {item.qty * item.price}
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
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>Tax</div>
                  div${order.taxPrice.toFixed(2)}
                </div>
              </li>
              <li>
                <div className='row'>
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <Spinner></Spinner>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant='danger'>{errorPay}</MessageBox>
                      )}
                      {loadingPay && <Spinner></Spinner>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={handlePaymentSuccess}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
