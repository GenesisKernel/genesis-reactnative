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
    isMultiple?: boolean;
  },
  {
    id: string;
    block: string;
  },
  string
>('RUN');

export const runCompositeContracts = actionCreator.async<
  {
    composite: {
      name: string;
      data: string;
    }[] | {
      name: string;
      data: string;
    };
    uuid: string;
  },
  {},
  string
>('RUN_COMPOSITE_CONTRACTS');

export const setTransactions = actionCreator<{}>('FILTER');

export const confirmNestedContracts = actionCreator<{ fullForsign: string; signParams: object }>('CONFIRM_NESTED_CONTRACTS');
