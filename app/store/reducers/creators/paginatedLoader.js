import { schema } from 'normalizr';
import { List, Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { denormalizeSelector } from 'store/utils';

export default function paginatedLoader({ types }) {
  const [
    requestActionType,
    successActionType,
    failureActionType,
  ] = types;

  const initialState = Map({
    loading: false,
    error: null,
    items: List(),
    count: 0,
    pageCount: 0,
    page: 0,
  });

  const handlers = {
    [requestActionType]: (state) => state
      .set('loading', true)
      .set('error', null),
    [successActionType]: (state, { payload }) => state
      .set('loading', false)
      .set('count', payload.get('count'))
      .set('page', payload.get('page'))
      .set('pageCount', payload.get('pageCount'))
      .set('items', payload.get('items')),
    [failureActionType]: (state, { payload }) => state
      .set('loading', false)
      .set('error', payload),
  };

  return handleActions(handlers, initialState);
}

export const createRootSelector = (stateSelector, itemSchema) => denormalizeSelector(
  stateSelector,
  { items: new schema.Array(itemSchema) },
);
