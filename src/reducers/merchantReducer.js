import { GET_CURRENT_MERCHANT, GET_CURRENT_PRODUCT_FOR_UPDATE } from "../actions/types";

const initialState = {
  merchant: {},
  currentItem: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_MERCHANT:
      return {
        ...state,
        merchant: action.payload,
      };
    case GET_CURRENT_PRODUCT_FOR_UPDATE:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
}
