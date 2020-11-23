import axios from "axios";
import { GET_COURIERS, COURIER_SELECTED , GET_ERRORS } from "./types";

export const getCouriers = () => async (dispatch) => {
    const res = await axios.get(
        "/api/courier/loadAll"
        );
    dispatch({
        type: GET_COURIERS,
        payload: res.data,
    });
}

export const selectCourier = (orderIdentifier, courierChoice, history) => async (dispatch) => {
    try {
      await axios.post(`api/cart/selectCourier/${orderIdentifier}`, courierChoice);
      history.push("/checkout/reload");
      dispatch({
        type: COURIER_SELECTED,
        payload: {},
      })
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }) 
    }
  }