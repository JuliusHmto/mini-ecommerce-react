import { GET_ALL_INVOICES } from "../actions/types";

const initialState = {
  invoices: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };

    default:
      return state;
  }
}
