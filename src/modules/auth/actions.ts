import actionCreatorFactory from 'typescript-fsa';
import { ILoginResponse } from '../../utils/api';

const actionCreator = actionCreatorFactory('AUTH');

export const generateKeyPair = actionCreator<{
  seed: string;
}>('GENERATE_KEYS_PAIR');

export const receivePassword = actionCreator<string>('RECEIVE_PASSWORD');

export const loginRequest = actionCreator<{ seed: string; password: string }>(
  'LOGIN_REQUEST'
);

export const receiveSelectedAccount = actionCreator.async<
  {
    uniqKey: string;
  },
  null
>('RECEIVE_SELECTED_ACCOUNT');

export const login = actionCreator.async<
  {
    password: string;
    accountAdress?: string;
    ecosystemId?: string;
    privateKey?: string;
  },
  {[uniqKey: string]: IAccount}
>('LOGIN');

export const attachSession = actionCreator<{
  currentAccount: string;
  token: string;
  refresh: string;
  ecosystems: string[];
}>('ATTATCH_SESSION');

export const detachSession = actionCreator('DETACH_SESSION');

export const refreshSession = actionCreator<{
  token: string;
  refresh: string;
}>('REFRESH_SESSION');

export const setRole = actionCreator<IRole>('SET_ROLE');

export const logout = actionCreator('LOGOUT');
