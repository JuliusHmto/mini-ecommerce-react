import axios from "axios";

import {
  GET_CART,
  GET_ERRORS,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  ADD_QTY,
  SUB_QTY,
  GET_TOTAL_PRICE,
  GET_TOTAL_ITEM,
  PROCESS_ORDER,
  CHECK_OUT,
} from "./types";

export const getCart = (userID) => async (dispatch) => {
  const res = await axios.get(
    `/api/cart/loadCart/${userID}`
  );
  dispatch({
    type: GET_CART,
    payload: res.data,
  });
};

export const getTotalPrice = (userID) => async (dispatch) => {
  const res = await axios.get(
    `/api/cart/getTotalPrice/${userID}`
  );
  dispatch({
    type: GET_TOTAL_PRICE,
    payload: res.data
  });
}

export const getTotalItem = (userID) => async (dispatch) => {
  const res = await axios.get(
    `/api/cart/getTotalItem/${userID}`
  );
  dispatch({
    type: GET_TOTAL_ITEM,
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

export const processOrder = (userID, extraDetail, history) => async (dispatch) => {
  try {
    await axios.post(
      `/api/order/checkout/${userID}`,
      extraDetail
    );
    history.push("/payment");
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