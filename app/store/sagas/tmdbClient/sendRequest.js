import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { normalize } from 'normalizr';

import { sendRequest as baseSendRequest } from 'utils/tmdbClient';
import { merge } from 'store/actions/entities';

function* sendRequest(methodName, responseSchema, ...args) {
  const response = yield call(baseSendRequest, methodName, ...args);

  if (responseSchema === null) {
    return fromJS(response);
  }

  const { result, entities } = normalize(response, responseSchema);

  yield put(merge(fromJS(entities)));

  return fromJS(result);
}

export default sendRequest;
