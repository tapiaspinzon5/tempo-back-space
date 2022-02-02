import React from "react";
import AppRouter from "./routes/AppRouter";
import DarkModeProvider from "./context/DarkModeProvider";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

const App = () => {
  const store = generateStore();

  // const [loginstate, setLoginstate] = useState(false);
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <AppRouter />
      </DarkModeProvider>
    </Provider>
  );
};

export default App;
