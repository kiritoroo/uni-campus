import ReactDOM from "react-dom/client";
import App from "./v3/App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "@Styles/main.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getQueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={getQueryClient}>
    <Router>
      <ToastContainer />
      <App />
    </Router>
  </QueryClientProvider>,
);
