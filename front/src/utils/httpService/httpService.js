import axios from "axios";
import { logout } from "../../store/auth/actions";

const httpService = axios.create({
  //   baseURL: process.env.REACT_APP_API_ENDPOINT || window.location.origin,
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
  }
});

export const updateHttpServiceToken = token => {
  httpService.defaults.headers["Authorization"] = "Bearer " + token;
};

export const setupInterceptors = (store, history) => {
  httpService.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log("Interceptors error handled");
      if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch(logout());
        history.push("/");
        return Promise.reject(error.response);
      } else {
        if ([400, 404].includes(error.response.status)) {
          //   store.dispatch(addNotification(error.response.data.message));
          return Promise.reject(error.response);
        }
      }
      return Promise.reject(error.response);
    }
  );
};
export default httpService;
