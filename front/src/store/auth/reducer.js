import { SIGN_IN_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes";

const initState = {
  auth: !!window.localStorage.getItem("accessToken"),
  token: window.localStorage.getItem("accessToken"),
  // TODO set automatically when app init
  currentUser: JSON.parse(window.localStorage.getItem("userData"))
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        auth: true,
        currentUser: action.payload.user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: "",
        auth: false,
        currentUser: ""
      };

    default:
      return state;
  }
};

export default authReducer;
