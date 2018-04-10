import * as actions from './actions';
import { mergeDeepWith, union, unionWith, eqBy, prop, omit } from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createAccount, removeAccount, attachEcosystem, saveTokenToAccount, setAccountUserdata, changePassword } from './actions';
import { getTokenExpiry } from 'modules/auth/selectors';

export interface IAccount {
  currentEcosystem: string;
  address: string;
  ecosystems: string[];
  encKey: string;
  publicKey: string;
  avatar: string;
  username: string;
  token?: string,
  tokenExpiry?: number,
  refresh?: string;
  sessions: IAccount[],
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
      ...payload.result,
      sessions: unionWith(eqBy(prop('ecosystem_id')), payload.result.sessions, state[payload.result.address].sessions), // merge two arrays without duplicated ecosystems
      ecosystems: union(state[payload.result.address].ecosystems, payload.result.ecosystems),
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
  .case(setAccountUserdata, (state, payload: any) => ({
    ...state,
    [payload.address]: {
      ...state[payload.address],
      sessions: payload.sessions,
    }
  }));
