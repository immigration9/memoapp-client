import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "reducers";

export default ({ children, initialState = {} }) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(ReduxThunk))
  );

  return <Provider store={store}>{children}</Provider>;
};
