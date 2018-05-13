import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducer';
import rootSaga from './saga';
import createSagaMiddleware from "redux-saga";

export default function configureStore(initialState) {

  const sagaMiddleware = createSagaMiddleware();
  const applyMiddlewareWrap = applyMiddleware(sagaMiddleware);

  const store = createStore(
    rootReducer,
    applyMiddlewareWrap
  );

  if (module.hot) {

    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer');
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);
  return store;
}
