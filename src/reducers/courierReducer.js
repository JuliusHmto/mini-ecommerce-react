import { GET_COURIERS } from "../actions/types";

const initialState = {
  courierList: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COURIERS:
      return {
        ...state,
        courierList: action.payload,
      };

    default:
      return state;
  }
}