import { isEmpty, values, filter } from 'ramda';
import { createSelector } from 'reselect';

import { IState as ITransactionState, ITransaction } from './reducer';

export const getTransactions = createSelector<
  any,
  ITransactionState,
  ITransactionState
>(state => state.transactions, transactions => transactions);

export const getTransaction = (uuid: string) =>
  createSelector<any, ITransactionState, ITransaction>(
    getTransactions,
    items => items[uuid]
  );

const isPendingTransaction = (item: ITransaction) => !item.block && !item.error;
const isPendingTransactionByInitiator = (initiator: string) => (
  item: ITransaction
) =>
  !!(
    isPendingTransaction(item) &&
    (item.meta && item.meta.initiator === initiator)
  );

export const hasPendingTransaction = createSelector<
  any,
  ITransactionState,
  boolean
>(
  state => state.transactions,
  items => !isEmpty(filter(isPendingTransaction, items))
);

export const hasPendingTransactionByInitiator = (initiator: string) =>
  createSelector<any, ITransactionState, boolean>(
    state => state.transactions,
    items => !isEmpty(filter(isPendingTransactionByInitiator(initiator), items))
  );
