import { fromJS } from 'immutable';

import { showRequest, showSuccess, showFailure } from 'store/actions/keywords';
import reducer, { makeGetById } from './show';

describe('keywords show reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {});
    const expected = fromJS({});
    expect(state).toEqual(expected);
  });

  it('should react on show request', () => {
    const state = reducer(undefined, showRequest(1)).toJS();
    const loader = { loading: true, error: null, data: 1 };
    const expected = { 1: loader };
    expect(state).toEqual(expected);
  });

  it('should react on show success', () => {
    const data = {};
    const state = reducer(undefined, showSuccess(data, 1)).toJS();
    const loader = { loading: false, error: null, data };
    const expected = { 1: loader };
    expect(state).toEqual(expected);
  });

  it('should react on show error', () => {
    const error = new Error();
    const state = reducer(undefined, showFailure(error, 1)).toJS();
    const loader = { loading: false, error, data: null };
    const expected = { 1: loader };
    expect(state).toEqual(expected);
  });

  it('should select the loader state', () => {
    const keyword = {};
    const globalState = fromJS({
      keywords: {
        show: {
          1: { data: 1 },
        },
      },
      entities: {
        keyword: { 1: keyword },
      },
    });
    expect(makeGetById(1)(globalState).toJS()).toEqual({ data: keyword });
  });
});
