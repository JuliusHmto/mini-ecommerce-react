import axios from "axios";

import { GET_ITEMS, GET_ITEM_DETAIL } from "./types";

export const getItems = () => async (dispatch) => {
  const res = await axios.get(
    "/api/product/loadAllProductOnCatalog"
  );
  dispatch({
    type: GET_ITEMS,
    payload: res.data,
  });
};

export const getItemDetail = (productID) => async (dispatch) => {
  const res = await axios.get(
    `/api/product/loadSpecificProduct/${productID}`
  );
  dispatch({
    type: GET_ITEM_DETAIL,
    payload: res.data,
  });
};