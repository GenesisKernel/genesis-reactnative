import { isEmpty } from 'ramda';
import { createSelector } from 'reselect';

import { IRootState } from 'modules';
import { IAccount, IState as AccountReduceState } from './reducer';

export const getAccounts = createSelector(
  (state: IRootState) => state.accounts,
  (accounts: AccountReduceState) => accounts
);

export const getAccount = (uniqKey: string) => createSelector(
  (state: IRootState) => state.accounts,
  (accounts: AccountReduceState) => accounts[uniqKey]
);

export const getAccountEncKey = (uniqKey: string) => createSelector(
  (state: IRootState) => state.accounts,
  (accounts: AccountReduceState) => accounts[uniqKey].encKey,
)
