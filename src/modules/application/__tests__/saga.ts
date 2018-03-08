import { applicationWatcher, persistWorker } from '../saga';
import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';

describe('applicationWatcher', () => {
  it('qwe', () => {
    const iterator = applicationWatcher();
    expect(iterator.next().value).toEqual(takeEvery(REHYDRATE, persistWorker));
  });
});