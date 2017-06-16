/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';

import * as actions from 'store/actions/keywords';
import show from './show';

describe('keywords show saga', () => {
  let task;

  beforeEach(() => {
    task = show({ payload: 1, meta: { key: 1 } });

    const callDescriptor = task.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the showSuccess if request was succeeded', () => {
    const putDescriptor = task.next(1).value;
    expect(putDescriptor).toEqual(put(actions.showSuccess(1, 1)));
  });

  it('should dispatch the showFailure if request was failed', () => {
    const error = new Error();
    const putDescriptor = task.throw(error).value;
    expect(putDescriptor).toEqual(put(actions.showFailure(error, 1)));
  });
});
