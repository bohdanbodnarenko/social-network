import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./auth/reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  auth: authReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
