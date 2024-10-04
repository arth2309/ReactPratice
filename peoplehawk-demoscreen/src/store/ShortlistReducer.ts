import { Shortlist, ShortlistReducerProps } from "../interface/Interface";
export const intialState: ShortlistReducerProps = {
  list: [],
  userList: [],
  userId: 0,
};

export type Action =
  | { type: "POST_SHORTLIST"; payload: Shortlist[] }
  | { type: "ADD_IN_SHORTLIST"; payload: Shortlist }
  | { type: "POST_USERID"; payload: number }
  | { type: "POST_USERLIST"; payload: Shortlist[] }
  | { type: "ADD_IN_USERLIST"; payload: Shortlist }
  | { type: "DELETE_IN_USERLIST"; payload: number };

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
        userList: state.userList.filter((item) => item.id != action.payload),
      };
    default:
      return state;
  }
};
