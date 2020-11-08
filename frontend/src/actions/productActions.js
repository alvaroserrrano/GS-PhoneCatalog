import {
  PRODUCTS_REQUEST,
  PRODUCTS_FAIL,
  PRODUCTS_SUCCESS,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
} from '../constants/productConstants';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCTS_REQUEST,
  });
  try {
    const { data } = await axios.get('./api/v1/products');
    dispatch({ type: PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCTS_FAIL, payload: error.message });
  }
};

export const getProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST, payload: productId });
  try {
    const { data } = await axios.get(`/api/v1/products/${productId}`);
    dispatch({ type: PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
