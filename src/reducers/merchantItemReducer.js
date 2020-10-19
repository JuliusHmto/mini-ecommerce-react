import { GET_CURRENT_MERCHANT_ITEMS } from "../actions/types";

const initialState = {
  merchantItems: [],
  merchantItem: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_MERCHANT_ITEMS:
      return { ...state, merchantItems: action.payload };

    default:
      return state;
  }
}
