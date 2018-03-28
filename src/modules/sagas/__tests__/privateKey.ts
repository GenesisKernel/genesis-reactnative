import { privateKeyExpireWorker, validatePassword, validatePrivateKeyWorker, requestPrivateKeyWorker } from '../privateKey';
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import Keyring from 'utils/keyring';
import * as application from 'modules/application';

describe('privateKeyExpireWorker', () => {
  it('privateKeyExpireWorker with no privateKey in store', () => {
    const iterator = privateKeyExpireWorker();
    iterator.next();
    expect(iterator.next(null).value).toEqual(undefined);
  });

  it('privateKeyExpireWorker with expired privateKey', () => {
    const iterator = privateKeyExpireWorker();
    const privateKey = { expireTime: 123123 };
    iterator.next();
    expect(iterator.next(privateKey).value).toEqual(put(application.actions.setPrivateKey(null)));
    expect(iterator.next().value).toEqual(call(delay, 600000));
    expect(iterator.next().value).toEqual(select(application.selectors.getPrivateKey));
  });

  it('privateKeyExpireWorker with valid privateKey', () => {
    const iterator = privateKeyExpireWorker();
    const privateKey = { expireTime: Date.now() + 10000000000 };
    iterator.next();
    expect(iterator.next(privateKey).value).toEqual(call(delay, 600000));
    expect(iterator.next().value).toEqual(select(application.selectors.getPrivateKey));
  });
});

describe('validatePassword', () => {
  it('privateKey valid', () => {
    const Payload = { encKey: 'encKey', password: 'password' };
    const { encKey, password } = Payload;
    const int64Key = 'decryptedValuedecryptedValuedecryptedValuedecryptedValdecrydecry';
    const iterator = validatePassword(Payload);
    iterator.next();
    expect(iterator.next(int64Key).value).toEqual(int64Key);
  });

    it('privateKey invalid', () => {
    const Payload = { encKey: 'encKey', password: 'password' };
    const { encKey, password } = Payload;
    const iterator = validatePassword(Payload);
    iterator.next();
    expect(iterator.next('length!==64').value).toEqual(null);
  });
});

describe('validatePrivateKeyWorker', () => {
  it('validatePrivateKeyWorker ==> privateKey exists', () => {
    const iterator = validatePrivateKeyWorker({ payload: 'password' });
    const Payload = { encKey: 'encKey', password: 'password' };
    const PRIVATE_KEY_LIVE_TIME = 3600000; // 1 hour
    iterator.next();
    iterator.next();
    iterator.next(Payload);
    iterator.next('privateKey');
    iterator.next();
    iterator.next();
    expect(iterator.next().value).toEqual(undefined);
  });

  it('validatePrivateKeyWorker ==> privateKey doesnt exists', () => {
    const iterator = validatePrivateKeyWorker({ payload: 'password' });
    const Payload = { encKey: 'encKey', password: 'password' };
    iterator.next();
    iterator.next();
    iterator.next(Payload);
    iterator.next(null);
    expect(iterator.next().value).toEqual(undefined);
  });
});

describe('requestPrivateKeyWorker', () => {
  it('requestPrivateKeyWorker privateKey is valid', () => {
    const iterator = requestPrivateKeyWorker();
    const int64Key = 'decryptedValuedecryptedValuedecryptedValuedecryptedValdecrydecry';
    iterator.next();
    expect(iterator.next({ privateKey: int64Key }).value).toEqual({ privateKey: int64Key })
  });

  it('requestPrivateKeyWorker privateKey is not valid, but modalResponse is canceled', () => {
    const iterator = requestPrivateKeyWorker();
    const int64Key = 'decryptedValuedecryptedValuedecryptedValuedecryptedValdecrydecry';
    iterator.next();
    iterator.next(null); // show modal
    iterator.next(); // RACE
    expect(iterator.next({ cancel: { } }).value).toEqual(undefined);
  });

  it('requestPrivateKeyWorker privateKey is not valid, modalResponse is success', () => {
    const iterator = requestPrivateKeyWorker();
    const int64Key = 'decryptedValuedecryptedValuedecryptedValuedecryptedValdecrydecry';
    iterator.next();
    iterator.next(null); // show modal
    iterator.next(); // RACE
    expect(iterator.next({ success: { payload: 'password' } }).value).toEqual(call(validatePrivateKeyWorker, { payload: 'password' }));
    expect(iterator.next('newKey').value).toEqual('newKey');
    expect(iterator.next().value).toEqual(undefined);
  });
});