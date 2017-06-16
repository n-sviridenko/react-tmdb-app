/* eslint-disable redux-saga/yield-effects */
import { fromJS } from 'immutable';

import sendListRequest from './sendListRequest';

describe('tmdbClient sendListRequest saga', () => {
  it('should dispatch call sendRequest and normalize the response', () => {
    const task = sendListRequest('foo.bar', {}, 'a', 'b');
    const res = fromJS({ total_results: 10, total_pages: 2, page: 1, results: [] });
    const list = fromJS({ count: 10, pageCount: 2, page: 1, items: [] });
    const callDescriptor = task.next().value;
    expect(callDescriptor).toMatchSnapshot();
    const returnDescriptor = task.next(res).value;
    expect(returnDescriptor).toEqual(list);
  });
});
