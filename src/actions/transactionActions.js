import axios from "axios";

import { GET_ALL_ORDERS, GET_ERRORS } from "./types";

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
