import { GET_ALL_ORDERS } from "../actions/types";

const initialState = {
  transactions: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        transactions: action.payload,
      };

    default:
      return state;
  }
}
