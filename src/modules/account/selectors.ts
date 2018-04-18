import { isEmpty } from 'ramda';
import { createSelector } from 'reselect';

import { IRootState } from 'modules'; // It's can be the circular dependency?
import { IAccount, IState as AccountReduceState } from './reducer';

export const hasAccounts = createSelector(
  (state: IRootState) => state.accounts,
  (accounts: AccountReduceState) => !isEmpty(Object.keys(accounts))
);

export const getAccounts = createSelector(
  (state: IRootState) => state.accounts,
  (accounts: AccountReduceState) => accounts
);

export const getAccount = (uniqKey: string) => createSelector(
  (state: IRootState) => state.accounts,
  (accounts: AccountReduceState) => accounts[uniqKey]
);

export const getAccountSession = (address: string, ecosystemId: string) => createSelector(
  (state: IRootState) => state.accounts,
  (accounts: AccountReduceState) => accounts[address].sessions.find((el: any ) => el.ecosystem_id === ecosystemId),
)