import { compositeContractsFinishCatcher, compositeContractsWorker } from '../compositeContracts';
import { takeEvery, put, spawn } from 'redux-saga/effects';

import * as transaction from 'modules/transaction';

jest.mock('uuid', () => ({
  v4: () => ''
}));

describe('composite contracts signing saga', () => {
  it('compositeContractsWorker, < 5 contracts, compositeResult = success', () => {
    const action = {
      type: transaction.actions.runCompositeContracts.started,
      payload: [{
        data: ['1', 2, 'test'],
        name: 'MainCondition',
        meta: {}
      }],
    };
    const compositeResult = {success: {}}
    const iterator = compositeContractsWorker(action);
    iterator.next();
    iterator.next('generatedKey');
    iterator.next();
    iterator.next(); // put(runContract)
    iterator.next(); // put(runContract)
    iterator.next(); // put(runContract)
    expect(iterator.next(compositeResult).value).toEqual(undefined);
  });

  it('compositeContractsWorker, > 5 contracts, compositeResult = success', () => {
    const action = {
      type: transaction.actions.runCompositeContracts.started,
      payload: [{
        data: ['1', 2, 'test', '1', 2, 'test' ],
        name: 'MainCondition',
        meta: {}
      }],
    };
    const compositeResult = {success: {}}
    const iterator = compositeContractsWorker(action);
    iterator.next();
    iterator.next('generatedKey');
    iterator.next();
    iterator.next(); // put(runContract)
    iterator.next(); // put(runContract)
    iterator.next(); // put(runContract)
    iterator.next(); // put(runContract)
    iterator.next(); // put(runContract)

    // first pack completed, return to the begining of function, now isFirstIteration = false, so it should run 1 put(runContract)

    iterator.next(compositeResult); // put(runContract)
    iterator.next(compositeResult); // put(runContract)
    expect(iterator.next(compositeResult).value).toEqual(undefined);
  });

  it('compositeContractsWorker, < 5 contracts, compositeResult = failed', () => {
    const action = {
      type: transaction.actions.runCompositeContracts.started,
      payload: [{
        data: ['1',],
        name: 'MainCondition',
        meta: {}
      }],
    };
    const compositeResult = { failed: {} };
    const iterator = compositeContractsWorker(action);
    iterator.next();
    iterator.next('generatedKey');
    iterator.next();
    iterator.next(); // put(runContract)
    expect(iterator.next(compositeResult).value).toEqual(put(transaction.actions.runCompositeContracts.failed({
      params: { name: 'finished', data: '' },
      error: 'Composite contract run failed.'
    })));
  });
});