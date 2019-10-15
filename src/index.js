import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Store from "Store";
import App from "components/App";

/**
 * Ant Design stylesheet
 */
import "antd/dist/antd.css";
import "styles/vendor.css";

ReactDOM.render(
  <BrowserRouter>
    <Store>
      <App />
    </Store>
  </BrowserRouter>,
  document.getElementById("root")
);
