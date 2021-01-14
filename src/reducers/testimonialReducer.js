import { GET_RATING } from "../actions/types";

const initialState = {
  ratings: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RATING:
      return {
        ...state,
        ratings: action.payload,
      };
    default:
      return state;
  }
}
