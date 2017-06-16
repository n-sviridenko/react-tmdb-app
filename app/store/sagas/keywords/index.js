import { takeLatest, takeEvery } from 'redux-saga/effects';

import * as actions from 'store/actions/keywords';
import search from './search';
import show from './show';

export function* searchWatcher() {
  yield takeLatest(actions.SEARCH_REQUEST, search);
}

export function* showWatcher() {
  yield takeEvery(actions.SHOW_REQUEST, show);
}

export default [
  searchWatcher,
  showWatcher,
];
