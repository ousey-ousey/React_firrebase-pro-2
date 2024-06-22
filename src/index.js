import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
// LEVEL2
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import { SpeedInsights } from "@vercel/speed-insights/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <SpeedInsights />
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <SpeedInsights />
    </HelmetProvider>
  </React.StrictMode>
);
