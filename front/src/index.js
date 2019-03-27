import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createBrowserHistory } from "history";
import "./index.css";

const history = createBrowserHistory();

ReactDOM.render(<App history={history} />, document.getElementById("root"));
