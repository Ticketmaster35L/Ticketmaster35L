import React from "react";
import { createRoot } from "react-dom/client"
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from './components'


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <Router>
    <App />
  </Router>
);

serviceWorker.unregister();

/*
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
