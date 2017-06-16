import {
  searchRequest,
  searchSuccess,
  searchFailure,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  showRequest,
  showSuccess,
  showFailure,
  SHOW_REQUEST,
  SHOW_SUCCESS,
  SHOW_FAILURE,
} from './keywords';

describe('keyword actions', () => {
  describe('searchRequest', () => {
    it('has a type of SEARCH_REQUEST', () => {
      const expected = { type: SEARCH_REQUEST, payload: 'Apple', meta: { key: 'Apple' } };
      expect(searchRequest('Apple')).toEqual(expected);
    });
  });

  describe('searchSuccess', () => {
    it('has a type of SEARCH_SUCCESS', () => {
      const res = {};
      const expected = { type: SEARCH_SUCCESS, payload: res, meta: { key: 'Apple' } };
      expect(searchSuccess(res, 'Apple')).toEqual(expected);
    });
  });

  describe('searchFailure', () => {
    it('has a type of SEARCH_FAILURE', () => {
      const err = new Error();
      const expected = { type: SEARCH_FAILURE, payload: err, error: true, meta: { key: 'Apple' } };
      expect(searchFailure(err, 'Apple')).toEqual(expected);
    });
  });

  describe('showRequest', () => {
    it('has a type of SHOW_REQUEST', () => {
      const expected = { type: SHOW_REQUEST, payload: 1, meta: { key: 1 } };
      expect(showRequest(1)).toEqual(expected);
    });
  });

  describe('showSuccess', () => {
    it('has a type of SHOW_SUCCESS', () => {
      const res = {};
      const expected = { type: SHOW_SUCCESS, payload: res, meta: { key: 1 } };
      expect(showSuccess(res, 1)).toEqual(expected);
    });
  });

  describe('showFailure', () => {
    it('has a type of SHOW_FAILURE', () => {
      const err = new Error();
      const expected = { type: SHOW_FAILURE, payload: err, error: true, meta: { key: 1 } };
      expect(showFailure(err, 1)).toEqual(expected);
    });
  });
});
