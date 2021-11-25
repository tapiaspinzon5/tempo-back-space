import AppRouter from "./components/AppRouter";
import DarkModeProvider from "./context/DarkModeProvider";

function App() {
  return (
    <DarkModeProvider>
      <AppRouter />
    </DarkModeProvider>
  );
}

export default App;
