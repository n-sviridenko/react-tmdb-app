/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actions from 'store/actions/keywords';
import search from './search';

describe('keywords search saga', () => {
  let task;

  beforeEach(() => {
    task = search({ payload: 'Apple', meta: { key: 'Apple' } });

    const callDescriptor = task.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the searchSuccess if request was succeeded', () => {
    const list = fromJS({ count: 10, pageCount: 2, page: 1, items: [] });
    const putDescriptor = task.next(list).value;
    expect(putDescriptor).toEqual(put(actions.searchSuccess(list, 'Apple')));
  });

  it('should dispatch the searchFailure if request was failed', () => {
    const error = new Error();
    const putDescriptor = task.throw(error).value;
    expect(putDescriptor).toEqual(put(actions.searchFailure(error, 'Apple')));
  });
});
