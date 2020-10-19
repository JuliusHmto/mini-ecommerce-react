import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import categoryReducer from "./categoryReducer";
import ecommReducer from "./ecommReducer";
import userReducer from "./userReducer";
import merchantReducer from "./merchantReducer";
import merchantItemReducer from "./merchantItemReducer";
import invoiceReducer from "./invoiceReducer";
import cartReducer from "./cartReducer";
import testimonialReducer from "./testimonialReducer";

export default combineReducers({
  errors: errorReducer,
  category: categoryReducer,
  ecommerce: ecommReducer,
  cart: cartReducer,
  invoice: invoiceReducer,
  user: userReducer,
  merchant: merchantReducer,
  merchantItem: merchantItemReducer,
  testimonial: testimonialReducer,
});
