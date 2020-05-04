import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootSaga from './sagas/root.saga'
import appReducer from './reducers/app.reducer';
import surveyReducer from "./reducers/survey.reducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  app: appReducer,
  survey: surveyReducer,
});

export type HappyState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(logger)
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
