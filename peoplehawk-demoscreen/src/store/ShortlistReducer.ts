import { Shortlist, ShortlistReducerProps } from "../interface/Interface";
export const intialState: ShortlistReducerProps = {
  list: [],
  favouriteList: [],
  userList: [],
  userId: 0,
};

export type Action =
  | { type: "POST_SHORTLIST"; payload: Shortlist[] }
  | { type: "POST_FAVOURITE_SHORTLIST"; payload: Shortlist[] }
  | { type: "ADD_IN_SHORTLIST"; payload: Shortlist }
  | { type: "ADD_IN_FAVOURITE_SHORTLIST"; payload: Shortlist }
  | { type: "REMOVE_IN_FAVOURITE_SHORTLIST"; payload: number }
  | { type: "POST_USERID"; payload: number }
  | { type: "POST_USERLIST"; payload: Shortlist[] }
  | { type: "ADD_IN_USERLIST"; payload: Shortlist }
  | { type: "DELETE_IN_USERLIST"; payload: number }
  | { type: "DELETE_SHORTLIST"; payload: number };

export const shortlistReducer = (
  state: ShortlistReducerProps,
  action: Action
): ShortlistReducerProps => {
  switch (action.type) {
    case "POST_SHORTLIST":
      return {
        ...state,
        list: action.payload,
      };
    case "POST_FAVOURITE_SHORTLIST":
      return {
        ...state,
        favouriteList: action.payload,
      };
    case "ADD_IN_SHORTLIST":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "POST_USERID":
      return {
        ...state,
        userId: action.payload,
      };
    case "POST_USERLIST":
      return {
        ...state,
        userList: action.payload,
      };
    case "ADD_IN_USERLIST":
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };
    case "DELETE_IN_USERLIST":
      return {
        ...state,
        userList: state.userList.filter((item) => item.id !== action.payload),
      };
    case "DELETE_SHORTLIST":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
      };
    case "ADD_IN_FAVOURITE_SHORTLIST":
      return {
        ...state,
        favouriteList: [...state.favouriteList, action.payload],
      };
    case "REMOVE_IN_FAVOURITE_SHORTLIST":
      return {
        ...state,
        favouriteList: state.favouriteList.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
