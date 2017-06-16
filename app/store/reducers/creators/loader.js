import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { denormalizeSelector } from 'store/utils';

export default function loader({ types, ...args }) {
  const [
    requestActionType,
    successActionType,
    failureActionType,
  ] = types;

  const {
    requestPayloadMapper = (data) => data,
    successPayloadMapper = (data, payload) => payload,
  } = args;

  const initialState = fromJS({
    loading: false,
    error: null,
    data: null,
  });

  return handleActions({
    [requestActionType]: (state, { payload }) => state
      .set('loading', true)
      .set('error', null)
      .set('data', requestPayloadMapper(state.get('data'), payload)),
    [successActionType]: (state, { payload }) => state
      .set('loading', false)
      .set('data', successPayloadMapper(state.get('data'), payload)),
    [failureActionType]: (state, { payload }) => state
      .set('loading', false)
      .set('error', payload),
  }, initialState);
}

export const createRootSelector = (stateSelector, dataSchema) => denormalizeSelector(
  stateSelector,
  { data: dataSchema },
);
