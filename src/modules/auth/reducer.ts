import * as actions from './actions';
import { omit } from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface IState {
  isAuthenticated: boolean;
  currentAccount?: string;
  token?: string;
  refresh?: string;
  tokenExpiry?: number;
  // publicKey?: string;
  // currentAccountAddress?: string;
  // currentEcosystemId?: string;
  // lastLoggedAccount?: object;
  // peivateKeyValid?: boolean;
}

const initialState: IState = {
  isAuthenticated: false,
};
// 3 month in milliseconds = 7776000000
export const generateTime = () => Date.now() + 7776000000;

export default reducerWithInitialState(initialState)
  .case(actions.attachSession, (state, payload) => ({
    ...state,
    ...omit(['ecosystems'], payload),
    tokenExpiry: generateTime(),
    isAuthenticated: true
  }))
  .case(actions.detachSession, state => ({
    ...initialState,
    // lastLoggedAccount: state.lastLoggedAccount,
  }))
  .case(actions.loginRequest, state => ({
    ...state,
    isAuthenticated: false,
  }))
  .case(actions.saveLastLoggedAccount, (state, payload) => ({
    ...state,
    lastLoggedAccount: payload,
  }))
  .case(actions.refreshSession, (state, paylod) => ({
    ...state,
    token: paylod.token,
    refresh: paylod.refresh,
    tokenExpiry: generateTime()
  }))