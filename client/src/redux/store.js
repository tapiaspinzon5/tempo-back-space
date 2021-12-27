import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//import reducers
import loginReducer, { readUserActiveAction } from "./loginDuck";

//combine reducers
const rootReducers = combineReducers({
  loginUser: loginReducer,
});

//  extension para el navegador
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Creacion del Store

export default function generateStore() {
  const store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk))
  );
  readUserActiveAction()(store.dispatch);
  return store;
}
