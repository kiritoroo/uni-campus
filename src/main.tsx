import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./v3/App.tsx";

import "react-toastify/dist/ReactToastify.css";
import "@Styles/main.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const getQueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={getQueryClient}>
    <Router>
      <ToastContainer />
      <App />
    </Router>
  </QueryClientProvider>,
);
