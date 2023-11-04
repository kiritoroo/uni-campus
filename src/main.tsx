import React from "react";
import ReactDOM from "react-dom/client";
import App from "./v2/App.tsx";
import "@Styles/main.scss";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <App />
  </Router>,
);
