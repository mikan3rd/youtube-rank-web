import {IndexOperations} from '../modules/Index';
import {fork} from 'redux-saga/effects';

function* rootSaga() {
  yield fork(IndexOperations);
}

export default rootSaga;
