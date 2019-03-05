import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Reactotron from '../config/reactotron';
import reducers from './ducks';
import sagas from './sagas';

const middlewares = [];

const sagaMonitor = Reactotron ? Reactotron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const tronMiddleware = Reactotron ? Reactotron.createEnhancer : () => {};

middlewares.push(sagaMiddleware);

const store = createStore(
  reducers,
  compose(
    tronMiddleware(),
    applyMiddleware(...middlewares),
  ),
);

sagaMiddleware.run(sagas);

export default store;
