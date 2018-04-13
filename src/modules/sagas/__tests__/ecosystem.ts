import { attachNewEcosystemWorker } from '../ecosystem';
import { all, put } from 'redux-saga/effects';

import * as auth from 'modules/auth';
import * as account from 'modules/account';
import * as transaction from 'modules/transaction';
import * as ecosystem from 'modules/ecosystem';

describe('attachNewEcosystemWorker should execute NewEcosystem contract', () => {
  const action = {
    type: transaction.actions.runTransaction.done,
    payload: {
      params: {
        contract: 'NewEcosystem',
      },
      result: {
        id: '2',
      }
    }
  }

  it('action.payload.params.contract === `NewEcosystem`', () => {
    const iterator = attachNewEcosystemWorker(action);
    iterator.next();
    expect(iterator.next('accountAddress').value).toEqual(all([
      put(account.actions.attachEcosystem({ accountAddress: 'accountAddress', ecosystemId: '2' })),
      put(ecosystem.actions.requestEcosystem.started({ ecosystems: ['2'] }))
    ]));
  });
});