import { GET_RATING, GET_COMMENT } from "../actions/types";

const initialState = {
  ratings: [],
  rating: {},
  comments: [],
  comment: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RATING:
      return {
        ...state,
        ratings: action.payload,
      };
    case GET_COMMENT:
      return {
        ...state,
        comments: [],
      };
    default:
      return state;
  }
}
