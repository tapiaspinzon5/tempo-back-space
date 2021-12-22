import React from "react";
import AppRouter from "./components/AppRouter";
import DarkModeProvider from "./context/DarkModeProvider";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

//const store = generateStore();

const App = () => {
  const store = generateStore();

  // const [loginstate, setLoginstate] = useState(false);
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <AppRouter />
        <Login />
      </DarkModeProvider>
    </Provider>
  );
};

export default App;
