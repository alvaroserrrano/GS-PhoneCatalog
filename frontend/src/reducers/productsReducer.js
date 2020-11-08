import {
  PRODUCTS_REQUEST,
  PRODUCTS_FAIL,
  PRODUCTS_SUCCESS,
  PRODUCT_SUCCESS,
  PRODUCT_REQUEST,
  PRODUCT_FAIL,
} from '../constants/productConstants';

export const productsReducer = (
  state = { products: [], loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return { loading: true };
    case PRODUCTS_SUCCESS:
      return { products: action.payload, loading: false };
    case PRODUCTS_FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const productReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { loading: true };
    case PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
