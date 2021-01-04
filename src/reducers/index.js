import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import categoryReducer from "./categoryReducer";
import ecommReducer from "./ecommReducer";
import courierReducer from "./courierReducer";
import userReducer from "./userReducer";
import merchantReducer from "./merchantReducer";
import merchantItemReducer from "./merchantItemReducer";
import transactionReducer from "./transactionReducer";
import cartReducer from "./cartReducer";
import testimonialReducer from "./testimonialReducer";
import addressReducer from "./addressReducer";
import totalReducer from "./totalReducer";
import merchantTransactionReducer from "./merchantTransactionReducer";


export default combineReducers({
  errors: errorReducer,
  category: categoryReducer,
  ecommerce: ecommReducer,
  courier: courierReducer,
  total: totalReducer,
  cart: cartReducer,
  transactions: transactionReducer,
  user: userReducer,
  address: addressReducer,
  merchant: merchantReducer,
  merchantItem: merchantItemReducer,
  merchantOrders: merchantTransactionReducer,
  testimonial: testimonialReducer,
});
