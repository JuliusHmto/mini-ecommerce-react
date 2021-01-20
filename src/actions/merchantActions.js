import axios from "axios";
import {
  GET_ERRORS,
  GET_CURRENT_MERCHANT,
  GET_CURRENT_MERCHANT_ITEMS,
  GET_CURRENT_PRODUCT_FOR_UPDATE,
  CREATE_PRODUCT,
  UPDATE_PRODUCT_WITH_IMAGE,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_ORDERS_MERCHANT,
  ACC_REJ_ORDER
} from "./types";

//new merchant from current user
export const createNewMerchant = (
  newMerchant,
  userID,
  history
) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/merchant/createMerchantToUserId/${userID}`,
      newMerchant
    );
    history.push("/my-shop/catalog");
    dispatch({
      type: GET_CURRENT_MERCHANT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//get merchant data
export const getMerchant = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/merchant/findMerchant/${userID}`
    );
    dispatch({
      type: GET_CURRENT_MERCHANT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getMerchantItems = (merchantID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/merchant/loadMerchantProduct/${merchantID}`
    );
    dispatch({
      type: GET_CURRENT_MERCHANT_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//create new product from current merchant
export const createProduct = (merchantID, formData, history) => async (dispatch) => {
  try {
    await axios.post(
      `/api/product/createProduct/${merchantID}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    history.push("/my-shop/catalog");
    dispatch({
      type: CREATE_PRODUCT,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//Get Product untuk di update
export const getProduct = (productID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/product/loadSpecificProduct/${productID}`
    );
    dispatch({
      type: GET_CURRENT_PRODUCT_FOR_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//update product with image
export const updateCurrentProductWithImage = (merchantID, formData, history) => async (dispatch) => {
  try {
    await axios.patch(
      `/api/product/updateProduct/${merchantID}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    history.push("/my-shop/catalog");
    dispatch({
      type: UPDATE_PRODUCT_WITH_IMAGE,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//update product without image
export const updateCurrentProduct = (merchantID, data, history) => async (dispatch) => {
  try {
    await axios.patch(
      `/api/product/updateProduct/${merchantID}`,
      data,
    );
    history.push("/my-shop/catalog");
    dispatch({
      type: UPDATE_PRODUCT,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteProduct = (productID, history) => async (dispatch)  => {
  try {
    await axios.delete(`/api/product/deleteProduct/${productID}`);
    history.push("/my-shop/catalog/reload");
    dispatch({
      type: DELETE_PRODUCT,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
}

export const loadAllMerchantOrders = (merchantName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/merchant/loadAllOrderInMerchant/${merchantName}`);
    dispatch({
      type: GET_ALL_ORDERS_MERCHANT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }
}

export const accRejOrder = (orderID, status) => async (dispatch)  => {
  try {
  await axios.post(`/api/order/accOrRejectOrder/${orderID}`, status);
    //history.push("/my-shop/transaction/reload");
    dispatch({
      type: ACC_REJ_ORDER,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  }
}