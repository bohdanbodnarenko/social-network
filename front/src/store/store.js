import {
  combineReducers,
  createStore,
  applyMiddleware
} from "redux";
import authReducer from "./auth/reducer";
import thunk from "redux-thunk";
import {
  composeWithDevTools
} from "redux-devtools-extension";
import usersReducer from "./users/reducer";
import postsReducer from "./posts/reducer";

const reducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;