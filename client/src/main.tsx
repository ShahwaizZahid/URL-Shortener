import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UrlProvider from "./context/UrlProvider.tsx";
import AuthProvider from "./context/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UrlProvider>
          <App />
        </UrlProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
