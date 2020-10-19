import { GET_ITEMS, GET_ITEM_DETAIL  } from "../actions/types";

const initialState = {
  items: [],
  itemDetail: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

      case GET_ITEM_DETAIL:
        return {
          ...state,
          itemDetail: action.payload,
        };

    default:
      return state;
  }
}
