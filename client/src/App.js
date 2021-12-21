import React, { useState } from "react";
import AppRouter from "./components/AppRouter";
import DarkModeProvider from "./context/DarkModeProvider";
import Login from "./pages/Login";

function App() {
  const [loginstate, setLoginstate] = useState(true);
  console.log(loginstate);
  return (
    <DarkModeProvider>
      {loginstate ? <AppRouter /> : <Login setLogin={setLoginstate} />}
    </DarkModeProvider>
  );
}

export default App;
