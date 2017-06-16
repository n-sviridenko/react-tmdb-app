/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actions from 'store/actions/genres';
import list from './list';

describe('genres list saga', () => {
  let task;

  beforeEach(() => {
    task = list();

    const callDescriptor = task.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the listSuccess if request was succeeded', () => {
    const items = fromJS([]);
    const res = fromJS({ genres: items });
    const putDescriptor = task.next(res).value;
    expect(putDescriptor).toEqual(put(actions.listSuccess(items)));
  });

  it('should dispatch the listFailure if request was failed', () => {
    const error = new Error();
    const putDescriptor = task.throw(error).value;
    expect(putDescriptor).toEqual(put(actions.listFailure(error)));
  });
});
