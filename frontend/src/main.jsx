import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./styles/admin.css";
import "./styles/filters.css";
import "./styles/forms.css";
import "./styles/generics.css";
import "./styles/layout.css";
import "./styles/modal.css";
import "./styles/normalize.css";
import "./styles/pagination.css";
import "./styles/tables.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
