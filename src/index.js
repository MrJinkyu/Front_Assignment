import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
