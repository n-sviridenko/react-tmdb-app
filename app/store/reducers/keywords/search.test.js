import { fromJS } from 'immutable';

import { searchRequest, searchSuccess, searchFailure } from 'store/actions/keywords';
import reducer, { makeGetByQuery } from './search';

describe('keywords search reducer', () => {
  it('returns the initial state', () => {
    const state = reducer(undefined, {}).toJS();
    const expected = {};
    expect(state).toEqual(expected);
  });

  it('should react on search request', () => {
    const state = reducer(undefined, searchRequest('Apple')).toJS();
    const expected = { loading: true, error: null, items: [], count: 0, pageCount: 0, page: 0 };
    expect(state).toEqual({ Apple: expected });
  });

  it('should react on search success', () => {
    const list = fromJS({ count: 10, pageCount: 2, page: 1, items: [1] });
    const state = reducer(undefined, searchSuccess(list, 'Apple')).toJS();
    const expected = { loading: false, error: null, items: [1], count: 10, pageCount: 2, page: 1 };
    expect(state).toEqual({ Apple: expected });
  });

  it('should react on search error', () => {
    const error = new Error();
    const state = reducer(undefined, searchFailure(error, 'Apple')).toJS();
    const expected = { loading: false, error, items: [], count: 0, pageCount: 0, page: 0 };
    expect(state).toEqual({ Apple: expected });
  });

  it('should select a state by query', () => {
    const keyword = {};
    const globalState = fromJS({
      keywords: {
        search: {
          Apple: {
            items: [1],
          },
        },
      },
      entities: {
        keyword: { 1: keyword },
      },
    });
    expect(makeGetByQuery('Apple')(globalState).toJS()).toEqual({ items: [keyword] });
  });
});
