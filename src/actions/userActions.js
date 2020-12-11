import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_CURRENT_USER,
  ADD_ADDRESS,
} from "./types";
import setJWTToken from "../securuityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

//register new user
export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/user/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
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
export const login = (LoginRequest) => async (dispatch) => {
  try {
    // post => Login Request
    const res = await axios.post(
      "/api/user/login",
      LoginRequest
    );
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

export const addNewAddress = (userID, addressData) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/user/addAddress/${userID}`,
      addressData
    );
    dispatch({
      type: ADD_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
