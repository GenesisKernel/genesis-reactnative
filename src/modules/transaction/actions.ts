import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('TRANSACTION');

export const checkTransactionStatus = actionCreator('CHECK');

export const runTransaction = actionCreator.async<
ITransactionStarted,
ITransactionDone,
string
>('RUN');

export const setTransactions = actionCreator<{}>('FILTER');

export const confirmNestedContracts = actionCreator<{ fullForsign: string; signParams: object }>('CONFIRM_NESTED_CONTRACTS');
