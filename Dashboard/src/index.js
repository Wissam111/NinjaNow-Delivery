import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { UploadContextProvider } from "./context/UploadContext";
import { LoadingContextProvider } from "./context/LoadingContext";
import { ApiContextProvider } from "./context/ApiContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApiContextProvider>
        <LoadingContextProvider>
          <App />
        </LoadingContextProvider>
      </ApiContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
