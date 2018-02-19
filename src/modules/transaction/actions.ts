import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('TRANSACTION');

export const checkTransactionStatus = actionCreator('CHECK');

export const runTransaction = actionCreator.async<
  {
    uuid: string;
    datetime: Date;
    contract: string;
    params?: {
      vde?: boolean;
      [name: string]: any;
    };
  },
  {
    id: string;
    block: string;
  },
  string
>('RUN');
export const setTransactions = actionCreator<{}>('FILTER');
export const confirmNestedContracts = actionCreator<{ fullForsign: string; signParams: object }>('CONFIRM_NESTED_CONTRACTS');