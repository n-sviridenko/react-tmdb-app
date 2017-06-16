import { fork, take, cancel } from 'redux-saga/effects';
import { createAction } from 'redux-actions';

import movies from './movies';

const sagas = [
  ...movies,
];

const HMR_CANCEL = 'app/sagas/HMR_CANCEL';

const hmrCancel = createAction(HMR_CANCEL);

function createAbortableSaga(saga) {
  if (process.env.NODE_ENV === 'development') {
    return function* main() {
      const sagaTask = yield fork(saga);

      yield take(HMR_CANCEL);
      yield cancel(sagaTask);
    };
  }

  return saga;
}

export function startSagas(sagaMiddleware) {
  sagas.map(createAbortableSaga).forEach((saga) => sagaMiddleware.run(saga));
}

export function cancelSagas(store) {
  store.dispatch(hmrCancel());
}
