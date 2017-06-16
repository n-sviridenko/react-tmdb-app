import { createAction } from 'redux-actions';

export const SEARCH_REQUEST = 'app/keywords/SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'app/keywords/SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'app/keywords/SEARCH_FAILURE';

export const searchRequest = createAction(SEARCH_REQUEST, null, (query) => ({ key: query }));
export const searchSuccess = createAction(SEARCH_SUCCESS, null, (res, key) => ({ key }));
export const searchFailure = createAction(SEARCH_FAILURE, null, (err, key) => ({ key }));

export const SHOW_REQUEST = 'app/keywords/SHOW_REQUEST';
export const SHOW_SUCCESS = 'app/keywords/SHOW_SUCCESS';
export const SHOW_FAILURE = 'app/keywords/SHOW_FAILURE';

export const showRequest = createAction(SHOW_REQUEST, null, (id) => ({ key: id }));
export const showSuccess = createAction(SHOW_SUCCESS, null, (res, key) => ({ key }));
export const showFailure = createAction(SHOW_FAILURE, null, (err, key) => ({ key }));
