import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./index.css";
import "./i18next";
import App from "./App";
import UserStore from "./contexts/UserStore";
import LanguageStore from "./contexts/LanguageContext";
import reportWebVitals from "./reportWebVitals";
import "./App.css";
import { setChonkyDefaults } from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import "react-modal-video/scss/modal-video.scss";
import PaymentProcessStore from "./contexts/PaymentProcessStore";

// Somewhere in your `index.ts`:
setChonkyDefaults({ iconComponent: ChonkyIconFA, disableDragAndDrop: true });

ReactDOM.render(
  <React.StrictMode>
    <UserStore>
      <PaymentProcessStore>
        <LanguageStore>
          <App />
        </LanguageStore>
      </PaymentProcessStore>
    </UserStore>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
