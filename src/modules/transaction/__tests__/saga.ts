import { contractWorker, signsWorker, filterTransactions, getTransactionStatus } from '../saga';
import { runTransaction } from '../actions';
import { requestPrivateKeyWorker, refreshPrivateKeyExpireTime } from '../../sagas/privateKey';
import { call, put } from 'redux-saga/effects';
import * as applicationActions from 'modules/application/actions';

describe('contractWorker', () => {
  const action = {
    type: runTransaction.started,
    payload: {
      uuid: 'uuid',
      contract: 'contract',
      params: {},
    },
  };

  const publicKey = 'publicKey';
  const getKey = { privateKey: 'privateKey' };
  const prepareData = { data: {prepareData: { time: '12312312' }} };
  const statusData = { data: { statusData: { result: 'norm', blockid: '123' } } };

  it('contractWorker with getKey, all nested contacts confirmed', () => {
    const signingResult = {
      valid: {
        payload: { fullForsign: '23123', signParams: { } }
      }
    };
    const iterator = contractWorker(action);
    iterator.next();
    iterator.next(getKey); // call getKey
    iterator.next();
    iterator.next(prepareData); // call prepareContract
    iterator.next(); // fork signsWorker
    iterator.next(signingResult); // valid won the race
    iterator.next(signingResult.valid.payload);
    iterator.next();
    // console.log(iterator.next(prepareData).value);
    iterator.next(statusData);
    iterator.next(statusData);
    expect(iterator.next().value).toEqual(call(refreshPrivateKeyExpireTime));
  });

  it ('contractWorker with getKey, invalid race won', () => {
    const iterator = contractWorker(action);
    const signingResult = {
      invalid: {
        payload: { fullForsign: '23123', signParams: { } }
      }
    };
    iterator.next();
    iterator.next(getKey); // call getKey
    iterator.next();
    iterator.next(prepareData); // call prepareContract
    iterator.next(); // fork signsWorker
    expect(iterator.next(signingResult).value).toEqual(put(applicationActions.closeModal()))
  });
});

describe('signsWorker', () => {
  const prepareData = {
    forsign: 'forsign',
    signs: [{forsign: 'forsign1', field: 'field'}],
  };
  const params = {};
  const privateKey = 'privateKey';
  const transactionUuid = 'transactionUuid';

  it('signsWorker with confirmModal', () => {
    const result = { confirm: {  } }
    const iterator = signsWorker(prepareData, params, privateKey, transactionUuid);
    iterator.next(); // put(showModal)
    iterator.next(); // race
    iterator.next(result); // confirm won
    iterator.next(); // confirmNestedContracts
    expect(iterator.next().value).toEqual(undefined);
  });

  it('signsWorker with closeModal', () => {
    const result = { cancel: {  } }
    const iterator = signsWorker(prepareData, params, privateKey, transactionUuid);
    iterator.next(); // put(showModal)
    iterator.next(); // race
    expect(iterator.next(result).value).toEqual(call(filterTransactions, transactionUuid));
    expect(iterator.next().value).toEqual(undefined);
  });
});

// describe('getTransactionStatus', () => {
//   it('getTransactionStatus', () => {

//   });
// });