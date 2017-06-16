import { call } from 'redux-saga/effects';
import { Map } from 'immutable';

import * as schemas from 'store/schemas';
import sendRequest from './sendRequest';

function* sendListRequest(methodName, itemSchema, ...args) {
  const res = yield call(sendRequest, methodName, schemas.makeList(itemSchema), ...args);

  return Map({
    count: res.get('total_results'),
    pageCount: res.get('total_pages'),
    page: res.get('page'),
    items: res.get('results'),
  });
}

export default sendListRequest;
