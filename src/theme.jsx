import React, { createContext, useContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeWrapper = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f7f7f7", paper: "#ffffff" },
                primary: { main: "#ff6b35" },
              }
            : {
                background: { default: "#121212", paper: "#1e1e1e" },
                primary: { main: "#ff6b35" },
              }),
        },
        shape: { borderRadius: 12 },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      {children(theme)}
    </ColorModeContext.Provider>
  );
};
