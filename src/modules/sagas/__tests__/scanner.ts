import { qrCodeWorker } from '../scanner';
import { put } from 'redux-saga/effects';
import { navigate } from 'modules/navigator/actions';
import { navTypes } from '../../../constants';

describe('qrCodeWorker', () => {
  it('qrCodeWorker => key.length === 64', () => {
    const action = { type: 'type', payload: 'decryptedValuedecryptedValuedecryptedValuedecryptedValdecrydecry;1;null' };
    const iterator = qrCodeWorker(action);
    expect(iterator.next().value).toEqual(put(
      navigate(navTypes.SIGN_IN, {
        privateKey: 'decryptedValuedecryptedValuedecryptedValuedecryptedValdecrydecry',
        ecosystemId: '1'
      })
    ));
    expect(iterator.next().value).toEqual(undefined);
  });

  it('qrCodeWorker => key.length !== 64', () => {
    const action = { type: 'type', payload: 'not64LengthKey;1;null' };
    const iterator = qrCodeWorker(action);
    // iterator.next();
    // expect(iterator.next().value).toEqual(undefined);
  });
});