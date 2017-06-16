import { createAction } from 'redux-actions';

export const DISCOVER_REQUEST = 'app/movies/DISCOVER_REQUEST';
export const DISCOVER_SUCCESS = 'app/movies/DISCOVER_SUCCESS';
export const DISCOVER_FAILURE = 'app/movies/DISCOVER_FAILURE';

export const discoverRequest = createAction(DISCOVER_REQUEST);
export const discoverSuccess = createAction(DISCOVER_SUCCESS);
export const discoverFailure = createAction(DISCOVER_FAILURE);
