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

export const receiveSelectedAccount = actionCreator<{ address: string, ecosystemId: string }>('RECEIVE_SELECTED_ACCOUNT');

export const login = actionCreator.async<
  {
    password: string;
    accountAdress?: string;
    ecosystemId?: string;
    privateKey?: string;
  },
  ILoginResponse & { account: object; privateKey: string }
>('LOGIN');

export const switchAccount = actionCreator.async<
  {
    accountAdress: string;
    ecosystemId: string;
  },
  null
>('SWITCH_ACCOUNT');

export const attachSession = actionCreator<{
  currentAccountAddress: string;
  currentEcosystemId: string;
  publicKey: string;
  privateKey: string;
  token: string;
  refresh: string;
  key_id?: string;
  tokenExpiry?: number;
}>('ATTATCH_SESSION');

export const detachSession = actionCreator('DETACH_SESSION');

export const refreshSession = actionCreator<{
  token: string;
  refresh: string;
}>('REFRESH_SESSION');

export const logout = actionCreator('LOGOUT');
export const saveLastLoggedAccount = actionCreator('SAVE_LAST_LOGGED_ACCOUNT');