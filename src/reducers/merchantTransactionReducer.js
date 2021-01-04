import { GET_ALL_ORDERS_MERCHANT } from "../actions/types";

const initialState = {
  merchantOrders: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS_MERCHANT:
      return {
        ...state,
        merchantOrders: action.payload,
      };
    default:
      return state;
  }
}