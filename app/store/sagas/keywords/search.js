import { call, put } from 'redux-saga/effects';

import * as schemas from 'store/schemas';
import * as actions from 'store/actions/keywords';
import { sendListRequest } from 'store/sagas/tmdbClient';

function* search({ payload: query, meta }) {
  try {
    const list = yield call(sendListRequest, 'search.getKeyword', schemas.keyword, { query });

    yield put(actions.searchSuccess(list, meta.key));
  } catch (err) {
    yield put(actions.searchFailure(err, meta.key));
  }
}

export default search;
