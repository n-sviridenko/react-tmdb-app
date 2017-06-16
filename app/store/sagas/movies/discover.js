import { call, put } from 'redux-saga/effects';
import { Map } from 'immutable';

import * as schemas from 'store/schemas';
import * as actions from 'store/actions/movies';
import { sendRequest } from 'store/sagas/tmdbClient';

function* discover() {
  try {
    const res = yield call(sendRequest, 'discover.getMovies', schemas.movieList, {});

    const list = Map({
      count: res.get('total_results'),
      pageCount: res.get('total_pages'),
      page: res.get('page'),
      items: res.get('results'),
    });

    yield put(actions.discoverSuccess(list));
  } catch (err) {
    yield put(actions.discoverFailure(err));
  }
}

export default discover;
