import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from './Spinner';
import { MessageBox } from './MessageBox';
import '../styles/Product.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../actions/productActions';
export const ProductPage = (props) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.product);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };
  return (
    <div>
      {loading ? (
        <Spinner> </Spinner>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div>
          <div className='back__home'>
            <Link to='/'>
              <button className='button__primary'>Back Home</button>
            </Link>
          </div>
          <div className='details'>
            {/* <div className='details__image'>
              <img src={product.imageFileName} alt='' />
            </div> */}
            {/* <div className='details__info'>
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  <b>{product.manufacturer}</b>
                </li>
                <li>
                  Price: <b>{product.price}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                  <div>Ram: {product.ram}</div>
                  <div>Screen: {product.screen}</div>
                  <div>Color: {product.color}</div>
                </li>
                <li>
                  <button className='button__primary'>Add to Cart</button>
                </li>
              </ul>
            </div> */}
            <div className='product'>
              <img
                className='product__image'
                src={product.imageFileName}
                alt='product'
              />

              <div className='product__name'>
                <Link to={'/product/' + product._id}>{product.name}</Link>
              </div>
              <div className='product__brand'>{product.manufacturer}</div>
              <div className='product__price'>${product.price}</div>
              <div className='product__rating'>
                {product.rating} Stars ({product.numReiews} Reviews)
              </div>
            </div>
            <div className='details__action'>
              <ul>
                <li>Price: {product.price}</li>
                <li>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Qty:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className='button__primary'
                    >
                      Add to Cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
