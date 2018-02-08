import actionCreatorFactory from 'typescript-fsa';

import { IAccout } from './reducer';
const actionCreator = actionCreatorFactory('ACCOUNT');

export const createAccount = actionCreator.async<
  { seed: string; password: string },
  IAccout
>('CREATE');

export const removeAccount = actionCreator.async<{ accountAddress: string }, any>(
  'REMOVE'
);

export const attachEcosystem = actionCreator<{
  accountAddress: string;
  ecosystemId: string;
}>('ATTACH_ECOSYSTEM');

export const saveTokenToAccount = actionCreator<{
  currentAccountAddress: string;
  token: string;
  refresh: string;
  tokenExpiry: number;
}>('SAVE_TOKEN_TO_ACCOUNT');

export const setAccountUserdata = actionCreator<{
  address: string;
  username: string;
  avatar: string;
}>('SET_ACCOUNT_USERDATA')