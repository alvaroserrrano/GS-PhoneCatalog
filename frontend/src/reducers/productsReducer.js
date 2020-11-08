import {
  PRODUCTS_REQUEST,
  PRODUCTS_FAIL,
  PRODUCTS_SUCCESS,
} from '../constants/productConstants';

export const productsReducer = (
  state = { products: [], loading: false, error: false },
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
