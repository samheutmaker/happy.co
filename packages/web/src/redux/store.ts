import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootSaga from './sagas/root.saga'
import appReducer from './reducers/app.reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    app: appReducer,
  }),
  compose(
    applyMiddleware(sagaMiddleware), 
    applyMiddleware(logger)
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
