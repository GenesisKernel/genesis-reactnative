import * as actions from './actions';
import { omit } from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface IState {
  isAuthenticated: boolean;
  currentAccount?: string;
  token?: string;
  refresh?: string;
  tokenExpiry?: number;
  currentRole?: IRole;
}

const initialState: IState = {
  isAuthenticated: false,
};

// 3 month in milliseconds = 7776000000
export const generateTime = () => Date.now() + (30 * 24 * 60 * 60 * 1000);

export default reducerWithInitialState(initialState)
  .case(actions.attachSession, (state, payload) => ({
    ...state,
    ...omit(['ecosystems'], payload),
    tokenExpiry: generateTime(),
    isAuthenticated: true
  }))
  .case(actions.detachSession, state => ({
    ...initialState,
  }))
  .case(actions.loginRequest, state => ({
    ...state,
    isAuthenticated: false,
  }))
  .case(actions.refreshSession, (state, paylod) => ({
    ...state,
    token: paylod.token,
    refresh: paylod.refresh,
    tokenExpiry: generateTime()
  }))
  .case(actions.setRole, (state, payload) => ({
    ...state,
    currentRole: payload,
  }))
