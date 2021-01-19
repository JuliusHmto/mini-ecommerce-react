import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_CURRENT_USER,
  ADD_ADDRESS,
  GET_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  REGISTER
} from "./types";
import setJWTToken from "../securuityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

//register new user
export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/user/register", newUser);
    history.push("/login");
    dispatch({
      type: REGISTER,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//login to find user
export const login = (LoginRequest, history) => async (dispatch) => {
  try {
    // post => Login Request
    const res = await axios.post(
      "/api/user/login",
      LoginRequest
    );
    history.push('/home');
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our userReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//logout user
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};

//get user data
export const getUserData = (id) => async (dispatch) => {
  const res = await axios.get(
    `/api/user/getUserInfo/${id}`
  );
  dispatch({
    type: GET_CURRENT_USER,
    payload: res.data,
  });
};

export const addNewAddress = (userID, newAddress) => async (dispatch) => {
  try {
    await axios.post(
      `/api/user/addAddress/${userID}`,
      newAddress
    );
    dispatch({
      type: ADD_ADDRESS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updateAddress = (userID, updatedAddress) => async (dispatch) => {
  try {
    await axios.patch(
      `/api/user/updateAddress/${userID}`,
      updatedAddress
    );
    dispatch({
      type: UPDATE_ADDRESS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const loadAllAddress = () => async (dispatch) => {
  const res = await axios.get(
    '/api/user/loadAllAddress'
  );
  dispatch({
    type: GET_ADDRESS,
    payload: res.data,
  });
};

export const deleteAddress = (addressID, history) => async (dispatch) => {
  try {
    await axios.delete(`/api/user/deleteAddress/${addressID}`);
    history.push("/profile/address/reload");
    dispatch({
      type: DELETE_ADDRESS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }
  
};