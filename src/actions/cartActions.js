import axios from "axios";
import { forEach, groupBy } from "lodash";

import {
  GET_CART,
  GET_ERRORS,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  ADD_QTY,
  SUB_QTY,
  PROCESS_ORDER,
  CHECK_OUT,
} from "./types";

export const getCart = () => async (dispatch) => {
  const res = await axios.get(
    `/api/cart/getCartDetail`
  );
  dispatch({
    type: GET_CART,
    payload: res.data,
  });
};

export const addToCart = (productID, userID, history) => async (
  dispatch
) => {
  try {
    await axios.post(
      `/api/cart/addProduct/${productID}/${userID}`, {});
    history.push("/cart");
    dispatch({
      type: ADD_TO_CART,
      payload: {},
    });
  } catch (err) {
    console.log( err.response.request );
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const addQuantity = (productID, userID, history) => async (
  dispatch
) => {
  try {
    await axios.post(
      `/api/cart/addProduct/${productID}/${userID}`, {});
    history.push("/cart/reload");
    dispatch({
      type: ADD_QTY,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const subQuantity = (productID, userID, history) => async (
  dispatch
) => {
  try {
    await axios.post(
      `/api/cart/subProduct/${productID}/${userID}`, {});
    history.push("/cart/reload");
    dispatch({
      type: SUB_QTY,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const removeFromCart = (productID, history) => async (
  dispatch
) => {
  await axios.delete(
    `/api/cart/deleteProductFromCart/${productID}`
  );
  history.push("/cart/reload");
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {},
  });
};

export const checkOut = (history) => async (dispatch) => {
  history.push("/checkout");
  dispatch({
    type:CHECK_OUT,
    payload: {},
  });
}

export const processOrder = (
  orderIdentifier,
  userID,
  cartDetail,
  history
) => async (dispatch) => {
  try {
    await axios.post(
      `/api/order/processItem/${orderIdentifier}/${userID}`,
      cartDetail
    );
    history.push("/invoice");
    dispatch({
      type: PROCESS_ORDER,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};


export const sortCart = (cartItems) => {
  let newCart = [];
  forEach(cartItems, (item) => {
    const newKey = item.merchantName;
    newCart = [...newCart, {...item, newKey: newKey}];
  });
  const merchantList = groupBy(newCart, 'newKey');
  let filteredCart = [];
  forEach(merchantList, (value)=> {
    const merchantType = value[0].key;
    filteredCart = [...filteredCart, {merchantType, listByType: value}];
  });
};