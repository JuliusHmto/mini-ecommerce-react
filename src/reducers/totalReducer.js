import { GET_TOTAL_PRICE, GET_TOTAL_ITEM } from "../actions/types";

const initialState = {
  totalPrice:'',
  totalItem: '',
};
export default function (state = initialState, action) {
  switch (action.type) {    
    case GET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };
    case GET_TOTAL_ITEM:
      return {
        ...state,
        totalItem: action.payload,
      };  
    default:
      return state;
  }
}
