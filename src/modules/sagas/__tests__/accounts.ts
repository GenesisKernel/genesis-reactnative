import { removeAccountWorker } from '../account';
import { removeAccount } from 'modules/account/actions';

describe('removeAccountWorker', () => {
  const action = {
    type: removeAccount.started,
    payload: {
      accountAddress: 'accountAddress'
    }
  }
  it('removeAccountWorker', () => {
    // const ite
  });
});