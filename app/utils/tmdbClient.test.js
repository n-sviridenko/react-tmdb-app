import { sendRequest } from './tmdbClient';

jest.mock('themoviedb-javascript-library', () => ({
  foo: {},
}));

const theMovieDb = require('themoviedb-javascript-library');

describe('tmdbClient', () => {
  describe('sendRequest', () => {
    function mockClientMethod(method) {
      theMovieDb.foo.bar = method;
    }

    it('should transfer arguments', () => { // eslint-disable-line arrow-body-style
      const method = jest.fn((a, b, onSuccess) => onSuccess(null));

      mockClientMethod(method);

      sendRequest('foo.bar', 'a', 'b');

      expect(method.mock.calls[0].slice(0, 2)).toEqual(['a', 'b']);
    });

    it('should resolve on success', () => { // eslint-disable-line arrow-body-style
      const res = {};

      mockClientMethod((onSuccess) => onSuccess(res));

      return sendRequest('foo.bar').then((data) => {
        expect(data).toBe(res);
      });
    });

    it('should reject on error', () => { // eslint-disable-line arrow-body-style
      const err = new Error();

      mockClientMethod((onSuccess, onError) => onError(err));

      return sendRequest('foo.bar').catch((data) => {
        expect(data).toBe(err);
      });
    });
  });
});
