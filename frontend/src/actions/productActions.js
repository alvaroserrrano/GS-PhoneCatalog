import {
  PRODUCTS_REQUEST,
  PRODUCTS_FAIL,
  PRODUCTS_SUCCESS,
} from '../constants/productConstants';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCTS_REQUEST,
  });
  try {
    const { data } = await axios.get('./api/products');
    dispatch({ type: PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCTS_FAIL, payload: error.message });
  }
};
