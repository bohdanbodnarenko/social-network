import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
