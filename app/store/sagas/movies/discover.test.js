/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actions from 'store/actions/movies';
import discover from './discover';

describe('movies discover saga', () => {
  let task;

  beforeEach(() => {
    task = discover();

    const callDescriptor = task.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the discoverSuccess if request was succeeded', () => {
    const res = fromJS({ total_results: 10, total_pages: 2, page: 1, results: [] });
    const list = fromJS({ count: 10, pageCount: 2, page: 1, items: [] });
    const putDescriptor = task.next(res).value;
    expect(putDescriptor).toEqual(put(actions.discoverSuccess(list)));
  });

  it('should dispatch the discoverFailure if request was failed', () => {
    const error = new Error();
    const putDescriptor = task.throw(error).value;
    expect(putDescriptor).toEqual(put(actions.discoverFailure(error)));
  });
});
