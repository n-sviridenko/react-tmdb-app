import { fromJS } from 'immutable';

import { listRequest, listSuccess, listFailure } from 'store/actions/genres';
import reducer, { getRoot } from './list';

describe('genres list reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {}).toJS();
    const expected = { loading: false, error: null, data: null };
    expect(state).toEqual(expected);
  });

  it('should react on list request', () => {
    const state = reducer(undefined, listRequest()).toJS();
    const expected = { loading: true, error: null, data: null };
    expect(state).toEqual(expected);
  });

  it('should react on list success', () => {
    const res = fromJS([1]);
    const state = reducer(undefined, listSuccess(res)).toJS();
    const expected = { loading: false, error: null, data: [1] };
    expect(state).toEqual(expected);
  });

  it('should react on list error', () => {
    const error = new Error();
    const state = reducer(undefined, listFailure(error)).toJS();
    const expected = { loading: false, error, data: null };
    expect(state).toEqual(expected);
  });

  it('should select a state by query', () => {
    const genre = {};
    const globalState = fromJS({
      genres: {
        list: {
          data: [1],
        },
      },
      entities: {
        genre: { 1: genre },
      },
    });
    expect(getRoot(globalState).toJS()).toEqual({ data: [genre] });
  });
});
