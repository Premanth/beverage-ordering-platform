import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ThemeWrapper } from "./theme.jsx";
import { CartProvider } from "./context/CartContext";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <ThemeWrapper>
        {(theme) => (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        )}
      </ThemeWrapper>
    </CartProvider>
  </BrowserRouter>
);
