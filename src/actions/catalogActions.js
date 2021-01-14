import axios from "axios";

import { GET_ITEMS, GET_ITEM_DETAIL, SEARCH_BAR } from "./types";

export const searchItem = (history) => async (dispatch) => {
  history.push("/catalog");
  dispatch({
    type:SEARCH_BAR,
    payload: {},
  });
}

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

export const getItemDetailWithProps = (productID, productName, history) => async (dispatch) => {
  const res = await axios.get(
    `/api/product/loadSpecificProduct/${productID}`
  );
  history.push(`/details/${productName}`);
  dispatch({
    type: GET_ITEM_DETAIL,
    payload: res.data,
  });
};