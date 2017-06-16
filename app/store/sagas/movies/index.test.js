/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';

import * as actions from 'store/actions/movies';
import { discoverWatcher } from './index';
import discover from './discover';

describe('movies saga', () => {
  describe('discoverWatcher', () => {
    const listWatcherTask = discoverWatcher();

    it('should start task to watch for DISCOVER_REQUEST action', () => {
      const takeLatestDescriptor = listWatcherTask.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(actions.DISCOVER_REQUEST, discover));
    });
  });
});
