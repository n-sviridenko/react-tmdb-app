import { call, put } from 'redux-saga/effects';

import * as schemas from 'store/schemas';
import * as actions from 'store/actions/keywords';
import { sendRequest } from 'store/sagas/tmdbClient';

function* show({ payload: id, meta }) {
  try {
    const res = yield call(sendRequest, 'keywords.getById', schemas.keyword, { id });

    yield put(actions.showSuccess(res, meta.key));
  } catch (err) {
    yield put(actions.showFailure(err, meta.key));
  }
}

export default show;
