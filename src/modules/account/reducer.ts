import * as actions from './actions';
import { mergeDeepWith, union, omit } from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createAccount, removeAccount, attachEcosystem, saveTokenToAccount, setAccountUserdata, changePassword } from './actions';
import { getTokenExpiry } from 'modules/auth/selectors';

export interface IAccount {
  address: string;
  // state: string;
  ecosystems: string[];
  encKey: string;
  publicKey: string;
  avatar: string;
  username: string;
  token?: string,
  tokenExpiry?: number,
  refresh?: string;
}

export interface IState {
  [id: string]: IAccount;
}

const initialState: IState = {};

const mergeAccount = mergeDeepWith<IAccount, Partial<IAccount>>(union);

export default reducerWithInitialState(initialState)
  .case(createAccount.done, (state, payload) => ({
    ...state,
    [payload.result.address]: {
      ...state[payload.result.address],
      ...payload.result
    }
  }))
  .case(removeAccount.done, (state, payload) => omit([payload.params.accountAddress])(state))
  .case(changePassword.done, (state, payload) =>({
    ...state,
    [payload.result.address]: {
      ...payload.result
    }
  }))
  .case(saveTokenToAccount, (state, payload: any) => ({
    ...state,
    [payload.currentAccountAddress]: {
      ...state[payload.currentAccountAddress],
      token: payload.token,
      tokenExpiry: payload.tokenExpiry,
      refresh: payload.refresh,
    }
  }))
  .case(attachEcosystem, (state, payload) => ({
    ...state,
    [payload.accountAddress]: mergeAccount(state[payload.accountAddress], {
      ecosystems: [payload.ecosystemId]
    })
  }))
  .case(setAccountUserdata, (state, payload) => ({
    ...state,
    [payload.address]: {
      ...state[payload.address],
      avatar: payload.avatar,
      username: payload.username,
    }
  }));
