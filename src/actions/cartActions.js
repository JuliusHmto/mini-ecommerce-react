import axios from "axios";

import {
  GET_CART,
  GET_ERRORS,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  ADD_QTY,
  SUB_QTY,
  GET_TOTAL,
  PROCESS_ORDER,
  CHECK_OUT,
} from "./types";

export const getCart = (userID) => async (dispatch) => {
  const res = await axios.get(
    `/api/order/loadAllCart/${userID}`
  );
  dispatch({
    type: GET_CART,
    payload: res.data,
  });
};

export const getTotal = (userID) => async (dispatch) => {
  const res = await axios.get(
    `/api/order/getTotal/${userID}`
  );
  dispatch({
    type: GET_TOTAL,
    payload: res.data
  });
}

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
  userID,
  history
) => async (dispatch) => {
  try {
    await axios.post(
      `/api/order/checkout/${userID}`,
      {}
    );
    history.push("/transaction");
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