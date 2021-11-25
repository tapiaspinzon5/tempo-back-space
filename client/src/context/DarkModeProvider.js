import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

//creacion del context
export const DarkModeContext = React.createContext();

const DarkModeProvider = ({ children }) => {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#00f",
            contrastText: "#0f0",
          },
          secondary: {
            main: "#0f0",
          },
        },
      }),
    [mode]
  );

  return (
    <DarkModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
