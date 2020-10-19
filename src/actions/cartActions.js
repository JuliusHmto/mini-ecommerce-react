import axios from "axios";

import {
  GET_CART,
  GET_ERRORS,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  ADD_QTY,
  SUB_QTY,
  PROCESS_ORDER,
} from "./types";

export const getCart = (trackOrder) => async (dispatch) => {
  const res = await axios.get(
    `/api/cart/getCartDetail/${trackOrder}`
  );
  dispatch({
    type: GET_CART,
    payload: res.data,
  });
};

export const addToCart = (productID, userID, orderNum, history) => async (
  dispatch
) => {
  try {
    await axios.post(
      `/api/cart/addProduct/${productID}/${userID}`,
      orderNum
    );
    history.push("/cart");
    dispatch({
      type: ADD_TO_CART,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const addQuantity = (productID, userID, orderNum, history) => async (
  dispatch
) => {
  try {
    await axios.post(
      `/api/cart/addProduct/${productID}/${userID}`,
      orderNum
    );
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

export const subQuantity = (productID, userID, orderNum, history) => async (
  dispatch
) => {
  try {
    await axios.post(
      `/api/cart/subProduct/${productID}/${userID}`,
      orderNum
    );
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

export const removeFromCart = (productID, orderNum, history) => async (
  dispatch
) => {
  await axios.delete(
    `/api/cart/deleteProductFromCart/${productID}/${orderNum}`
  );
  history.push("/cart/reload");
  dispatch({
    type: REMOVE_FROM_CART,
    payload: {},
  });
};

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
