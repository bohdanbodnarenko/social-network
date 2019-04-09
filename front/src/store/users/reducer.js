import {
  SET_USERS,
  SET_SELECTED_USER
} from "./types";

const initState = {
  users: [],
  selectedUser: null
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload
      }
    default:
      return state;
  }
};

export default usersReducer;