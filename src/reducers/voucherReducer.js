import { LOAD_VOUCHERS, GET_VOUCHER_STATUS } from "../actions/types";

const initialState = {
  hasVoucher: '',
  vouchers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_VOUCHERS:
      return {
        ...state,
        vouchers: action.payload,
      };
    case GET_VOUCHER_STATUS:
      return {
        ...state,
        hasVoucher: action.payload,
      };
    default:
      return state;
  }
}
