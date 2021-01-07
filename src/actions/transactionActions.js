import axios from "axios";

import { GET_ALL_ORDERS, FINISH_ORDER, GET_ERRORS } from "./types";

export const getAllTransactions = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/order/loadAllHistory/${userID}`
    );
    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const finishOrder = (orderID, status, history) => async (dispatch)  => {
  try {
  await axios.post(`/api/order/finishOrder/${orderID}`, status);
    history.push("/transaction/reload");
    dispatch({
      type: FINISH_ORDER,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  }
}