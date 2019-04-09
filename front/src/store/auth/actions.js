import {
  SIGN_IN_SUCCESS,
  LOGOUT_SUCCESS
} from "./actionTypes";
import {
  updateHttpServiceToken
} from "../../utils/httpService/httpService";
import {
  history
} from "../../App";
import {
  signout
} from "../../utils/requests";

export const signinSuccess = (token, user) => {
  updateHttpServiceToken(token);
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      token,
      user
    }
  };
};

export const logout = () => dispatch => {
  history.push("/");
  signout();
  updateHttpServiceToken("");
  window.localStorage.clear();
  dispatch({
    type: LOGOUT_SUCCESS
  });
};