/* eslint-disable redux-saga/yield-effects */
import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { schema } from 'normalizr';

import { sendRequest as baseSendRequest } from 'utils/tmdbClient';
import { merge } from 'store/actions/entities';
import sendRequest from './sendRequest';

describe('tmdbClient sendRequest saga', () => {
  it('should send a request', () => {
    const sendRequestTask = sendRequest('discover.getMovies', null, { foo: 'bar' });
    const callEffect = call(baseSendRequest, 'discover.getMovies', { foo: 'bar' });
    expect(sendRequestTask.next().value).toEqual(callEffect);
  });

  it('should return an immutable response', () => {
    const sendRequestTask = sendRequest('discover.getMovies', null, { foo: 'bar' });
    expect(sendRequestTask.next().value).toMatchSnapshot();
    const returnDescriptor = sendRequestTask.next({});
    expect(returnDescriptor.value).toEqual(fromJS({}));
    expect(returnDescriptor.done).toBe(true);
  });

  it('should return normalize response if schema is specified', () => {
    const responseSchema = new schema.Entity('movie');
    const sendRequestTask = sendRequest('discover.getMovie', responseSchema, { id: 1 });
    expect(sendRequestTask.next().value).toMatchSnapshot();
    const movie = { id: 1, title: 'Sam' };
    const entities = fromJS({ movie: { 1: movie } });
    const mergeDescriptor = sendRequestTask.next(movie);
    expect(mergeDescriptor.value).toEqual(put(merge(entities)));
    const returnDescriptor = sendRequestTask.next();
    expect(returnDescriptor.value).toBe(1);
    expect(returnDescriptor.done).toBe(true);
  });
});
