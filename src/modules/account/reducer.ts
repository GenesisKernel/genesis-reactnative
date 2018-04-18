import * as actions from './actions';
import { mergeDeepWith, union, unionWith, eqBy, prop, omit, path } from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createAccount, removeAccount, attachEcosystem, saveTokenToAccount, setAccountUserdata, changePassword } from './actions';
import { getTokenExpiry } from 'modules/auth/selectors';

export interface IAccount {
  uniqKey: string;
  avatar: string;
  username: string;
  ecosystem_id: string;
  key_id: string;
  address: string;
  roles: string[];
  encKey: string;
  publicKey: string;
}

export interface IState {
  [id: string]: IAccount;
}

const initialState: IState = {};

const mergeAccount = mergeDeepWith<IAccount, Partial<IAccount>>(union);

export default reducerWithInitialState(initialState)
  .case(createAccount.done, (state, payload: any) => ({
    ...state,
    ...payload.result,
  }))
  .case(removeAccount.done, (state, payload) => omit([payload.params.uniqKey])(state))
  .case(changePassword.done, (state, payload: any) =>({
    ...state,
    [payload.result.uniqKey]: {
      ...payload.result,
    }
  }))
  .case(saveTokenToAccount, (state, payload: any) => ({
    ...state,
    [payload.currentAccountAddress]: {
      ...state[payload.currentAccountAddress],
      ...omit(['currentAccountAddress'], payload),
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
