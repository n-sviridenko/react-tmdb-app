import { fromJS } from 'immutable';

import { discoverRequest, discoverSuccess, discoverFailure } from 'store/actions/movies';
import reducer, { getRoot } from './discover';

describe('movies discover reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {}).toJS();
    const expected = { loading: false, error: null, items: [], count: 0, pageCount: 0, page: 0 };
    expect(state).toEqual(expected);
  });

  it('should react on discover request', () => {
    const state = reducer(undefined, discoverRequest()).toJS();
    const expected = { loading: true, error: null, items: [], count: 0, pageCount: 0, page: 0 };
    expect(state).toEqual(expected);
  });

  it('should react on discover success', () => {
    const list = fromJS({ count: 10, pageCount: 2, page: 1, items: [1] });
    const state = reducer(undefined, discoverSuccess(list)).toJS();
    const expected = { loading: false, error: null, items: [1], count: 10, pageCount: 2, page: 1 };
    expect(state).toEqual(expected);
  });

  it('should react on discover error', () => {
    const error = new Error();
    const state = reducer(undefined, discoverFailure(error)).toJS();
    const expected = { loading: false, error, items: [], count: 0, pageCount: 0, page: 0 };
    expect(state).toEqual(expected);
  });

  it('should select the root state', () => {
    const movie = {};
    const globalState = fromJS({
      movies: {
        discover: {
          items: [1],
        },
      },
      entities: {
        movie: { 1: movie },
      },
    });
    expect(getRoot(globalState).toJS()).toEqual({ items: [movie] });
  });
});
