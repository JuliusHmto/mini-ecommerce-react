import axios from "axios";

import { GET_ALL_INVOICES, GET_ERRORS } from "./types";

export const getAllInvoice = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/order/loadAllOrder/${userID}`
    );
    dispatch({
      type: GET_ALL_INVOICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};
