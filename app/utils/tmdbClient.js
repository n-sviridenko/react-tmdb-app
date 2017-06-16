import get from 'lodash/get';
import isString from 'lodash/isString';
import theMovieDb from 'themoviedb-javascript-library';

export function sendRequest(methodName, ...args) {
  const method = get(theMovieDb, methodName);

  return new Promise((resolve, reject) => {
    // Ensure that the response was decoded from JSON
    // TODO: use resolve when https://github.com/cavestri/themoviedb-javascript-library/issues/36 will be resolved
    const finalResolve = (data) => {
      let finalData = data;

      if (isString(finalData)) {
        try {
          finalData = JSON.parse(data);
        } catch (e) {} // eslint-disable-line no-empty
      }

      resolve(finalData);
    };

    method(...args, finalResolve, reject);
  });
}
