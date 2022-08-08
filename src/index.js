import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";

// const root = ReactDOM.createRoot(document.getElementById("root"));

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
