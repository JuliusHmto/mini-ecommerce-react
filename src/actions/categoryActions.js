import axios from "axios";
import { GET_CATEGORY } from "./types";

export const getCategory = () => async (dispatch) => {
  const res = await axios.get(
    "/api/category/loadCategory"
  );
  dispatch({
    type: GET_CATEGORY,
    payload: res.data,
  });
};
