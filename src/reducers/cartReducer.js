import { GET_CART } from "../actions/types";

const initialState = {
  cartItems: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
}
