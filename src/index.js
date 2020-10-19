import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Provider } from "react-redux";
import store from "./store";

const root = document.getElementById("root");

const MyAppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<MyAppWithStore />, root);

serviceWorker.unregister();
