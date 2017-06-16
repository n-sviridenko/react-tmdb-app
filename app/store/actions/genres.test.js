import {
  listRequest,
  listSuccess,
  listFailure,
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_FAILURE,
} from './genres';

describe('genres actions', () => {
  describe('listRequest', () => {
    it('has a type of LIST_REQUEST', () => {
      const expected = { type: LIST_REQUEST, payload: undefined };
      expect(listRequest()).toEqual(expected);
    });
  });

  describe('listSuccess', () => {
    it('has a type of LIST_SUCCESS', () => {
      const res = {};
      const expected = { type: LIST_SUCCESS, payload: res };
      expect(listSuccess(res)).toEqual(expected);
    });
  });

  describe('listFailure', () => {
    it('has a type of LIST_FAILURE', () => {
      const err = new Error();
      const expected = { type: LIST_FAILURE, payload: err, error: true };
      expect(listFailure(err)).toEqual(expected);
    });
  });
});
