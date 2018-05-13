// @flow
import {put, takeLatest, call} from 'redux-saga/effects';

import Actions from './actions';
import {SearchApi} from '../../helpers/api';

export default function* (): Generator<*, *, *> {
  yield takeLatest(Actions.getSearchResult, getSearchResult);
}

function* getSearchResult(action) : Generator<*, *, *> {
  yield put(Actions.changeValueForKey({key: 'isLoading', value: true}));
  const params = action.payload;
  console.log("params:", params);
  const response = yield call(SearchApi.get, params);
  yield put(Actions.changeValueForKey({key: 'results', value: response.data}));
  yield put(Actions.changeValueForKey({key: 'isLoading', value: false}));
}
