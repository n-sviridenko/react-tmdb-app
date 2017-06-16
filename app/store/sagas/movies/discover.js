import { call, put } from 'redux-saga/effects';

import * as schemas from 'store/schemas';
import * as actions from 'store/actions/movies';
import { sendListRequest } from 'store/sagas/tmdbClient';

function* discover({ payload: data }) {
  const query = {};

  if (data.get('year')) {
    query.primary_release_year = data.get('year');
  }

  if (data.get('orderBy')) {
    query.sort_by = data.get('orderBy');
  }

  if (data.has('genres') && data.get('genres').size > 0) {
    query.with_genres = data.get('genres').join(',');
  }

  if (data.has('keywords') && data.get('keywords').size > 0) {
    query.with_keywords = data.get('keywords').join(',');
  }

  if (data.get('page')) {
    query.page = data.get('page');
  }

  try {
    const list = yield call(sendListRequest, 'discover.getMovies', schemas.movie, query);

    yield put(actions.discoverSuccess(list));
  } catch (err) {
    yield put(actions.discoverFailure(err));
  }
}

export default discover;
