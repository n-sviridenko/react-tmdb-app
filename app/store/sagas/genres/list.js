import { call, put } from 'redux-saga/effects';
import { schema } from 'normalizr';

import * as schemas from 'store/schemas';
import * as actions from 'store/actions/genres';
import { sendRequest } from 'store/sagas/tmdbClient';

function* list() {
  try {
    const resSchema = { genres: new schema.Array(schemas.genre) };
    const res = yield call(sendRequest, 'genres.getList', resSchema, {});

    yield put(actions.listSuccess(res.get('genres')));
  } catch (err) {
    yield put(actions.listFailure(err));
  }
}

export default list;
