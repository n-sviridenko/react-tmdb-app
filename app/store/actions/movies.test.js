import {
  discoverRequest,
  discoverSuccess,
  discoverFailure,
  DISCOVER_REQUEST,
  DISCOVER_SUCCESS,
  DISCOVER_FAILURE,
} from './movies';

describe('movie actions', () => {
  describe('discoverRequest', () => {
    it('has a type of DISCOVER_REQUEST', () => {
      const query = {};
      const expected = { type: DISCOVER_REQUEST, payload: query };
      expect(discoverRequest(query)).toEqual(expected);
    });
  });

  describe('discoverSuccess', () => {
    it('has a type of DISCOVER_SUCCESS', () => {
      const res = {};
      const expected = { type: DISCOVER_SUCCESS, payload: res };
      expect(discoverSuccess(res)).toEqual(expected);
    });
  });

  describe('discoverFailure', () => {
    it('has a type of DISCOVER_FAILURE', () => {
      const err = new Error();
      const expected = { type: DISCOVER_FAILURE, payload: err, error: true };
      expect(discoverFailure(err)).toEqual(expected);
    });
  });
});
