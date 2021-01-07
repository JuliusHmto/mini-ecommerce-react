import axios from "axios";
import {
  APPLY_VOUCHER,
  CANCEL_APPLY_VOUCHER,
  LOAD_VOUCHERS,
  GET_VOUCHER_STATUS,
  GET_ERRORS
} from "./types";

export const loadVouchers = () => async (dispatch) => {
    const res = await axios.get(
      '/api/voucher/loadAll'
    );
    dispatch({
      type: LOAD_VOUCHERS,
      payload: res.data,
    });
  };

  export const getVoucherStatus = (userID) => async (dispatch) => {
    const res = await axios.get(
      `/api/voucher/getStatusVoucher/${userID}`
    );
    dispatch({
      type: GET_VOUCHER_STATUS,
      payload: res.data,
    });
  };

  export const applyVoucher = (userID, voucherCode) => async (dispatch) => {
    try {
      await axios.post(
        `/api/voucher/applyVoucher/${userID}`, voucherCode
      );
      dispatch({
        type: APPLY_VOUCHER,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    }
  };

  export const cancelVoucher = (userID) => async (dispatch) => {
    try {
      await axios.post(
        `/api/voucher/cancelApplyVoucher/${userID}`
      );
      dispatch({
        type: CANCEL_APPLY_VOUCHER,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    }
  };