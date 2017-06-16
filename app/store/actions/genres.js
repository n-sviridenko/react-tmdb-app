import { createAction } from 'redux-actions';

export const LIST_REQUEST = 'app/genres/LIST_REQUEST';
export const LIST_SUCCESS = 'app/genres/LIST_SUCCESS';
export const LIST_FAILURE = 'app/genres/LIST_FAILURE';

export const listRequest = createAction(LIST_REQUEST);
export const listSuccess = createAction(LIST_SUCCESS);
export const listFailure = createAction(LIST_FAILURE);
