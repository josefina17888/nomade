import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from './Redux/Store/index';
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL= process.env.REACT_APP_API || "http://localhost:3001/"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
