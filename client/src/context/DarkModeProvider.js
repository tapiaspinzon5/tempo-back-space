import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import notoSans from "../fonts/NotoSans-Regular.ttf";

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
        typography: {
          fontFamily: `${notoSans}`,
          fontSize: 14,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
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
