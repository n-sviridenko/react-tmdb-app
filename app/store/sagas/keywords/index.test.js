/* eslint-disable redux-saga/yield-effects */
import { takeLatest, takeEvery } from 'redux-saga/effects';

import * as actions from 'store/actions/keywords';
import { searchWatcher, showWatcher } from './index';
import search from './search';
import show from './show';

describe('keywords saga', () => {
  describe('searchWatcher', () => {
    const task = searchWatcher();

    it('should start task to watch for SEARCH_REQUEST action', () => {
      const takeLatestDescriptor = task.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(actions.SEARCH_REQUEST, search));
    });
  });

  describe('showWatcher', () => {
    const task = showWatcher();

    it('should start task to watch for SHOW_REQUEST action', () => {
      const takeLatestDescriptor = task.next().value;
      expect(takeLatestDescriptor).toEqual(takeEvery(actions.SHOW_REQUEST, show));
    });
  });
});
