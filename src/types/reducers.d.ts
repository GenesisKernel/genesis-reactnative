declare interface ITransactionDone {
  result: {
    block: string;
    id: string;
    contract: string;
  };
}

declare interface ITransactionStarted {
  uuid: string;
  datetime: Date;
  contracts: { contract: string; params: any }[];
}

declare interface ITransactionFailed {
  uuid: string;
  error: string;
}
