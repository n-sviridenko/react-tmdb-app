/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';

import * as actions from 'store/actions/genres';
import { listWatcher } from './index';
import list from './list';

describe('genres saga', () => {
  describe('listWatcher', () => {
    const task = listWatcher();

    it('should start task to watch for LIST_REQUEST action', () => {
      const takeLatestDescriptor = task.next().value;
      expect(takeLatestDescriptor).toEqual(takeLatest(actions.LIST_REQUEST, list));
    });
  });
});
