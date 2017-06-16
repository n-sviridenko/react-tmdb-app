import { takeLatest } from 'redux-saga/effects';

import * as actions from 'store/actions/movies';
import discover from './discover';

export function* discoverWatcher() {
  yield takeLatest(actions.DISCOVER_REQUEST, discover);
}

export default [
  discoverWatcher,
];
