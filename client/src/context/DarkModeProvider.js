import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

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
          h6: {
            fontSize: "20px",
            color: "#3047B0",
          },
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                //primary: blue,
                divider: blue[400],
                background: {
                  default: "#fff",
                  primary: "linear-gradient(180deg, #3047B0 0%, #0087FF 100%)",
                  paper: blue[900],
                  secondary: "#E8E8E8",
                  navigator: "#F9F9F9",
                },
                colorBox: "#0f0",
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
              }
            : {
                // palette values for dark mode
                //primary: red,
                divider: blue[700],
                background: {
                  default: "#04092F",
                  primary: "linear-gradient(180deg, #FF0082 0%, #780096 100%)",
                  paper: blue[900],
                  secondary: "#FF0082",
                  navigator:
                    "linear-gradient(180deg, #FF0082 0%, #780096 100%)",
                },
                text: {
                  primary: "#fff",
                  secondary: grey[500],
                },
              }),
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
