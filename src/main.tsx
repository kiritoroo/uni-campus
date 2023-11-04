import ReactDOM from "react-dom/client";
import App from "./v3/App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "@Styles/main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <App />
  </Router>,
);
