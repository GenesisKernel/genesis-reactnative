import actionCreatorFactory from 'typescript-fsa';

import { IAccout } from './reducer';
const actionCreator = actionCreatorFactory('ACCOUNT');

export const createAccount = actionCreator.async<
  { seed: string; password: string },
  IAccout
>('CREATE');

export const removeAccount = actionCreator.async<{ accountId: string }, any>(
  'REMOVE'
);

export const attachEcosystem = actionCreator<{
  accountId: string;
  ecosystemId: string;
}>('ATTACH_ECOSYSTEM');
