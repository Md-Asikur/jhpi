import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import ContextProvider from "./context/ContextProvider";

ReactDOM.render(
  <ContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ContextProvider>,
  document.getElementById("root")
);
