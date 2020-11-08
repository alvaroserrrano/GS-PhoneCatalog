import { ADD_TO_CART } from '../constants/cartConstants';
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const itemExists = state.cartItems.find((x) => x._id === item._id);
      console.log(itemExists);
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === itemExists._id ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    default:
      return state;
  }
};
