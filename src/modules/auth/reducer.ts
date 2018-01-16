import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface IState {
  token?: string;
  refresh?: string;
  tokenExpiry?: number;
  publicKey?: string;
  privateKey?: string;
  currentAccountId?: string;
  currentEcosystemId?: string;
  isAuthenticated?: boolean;
}

const initialState: IState = {
  isAuthenticated: false
};

const generateTime = () => new Date(Date.now() + 36000 * 1000).getTime();

export default reducerWithInitialState(initialState)
  .case(actions.attachSession, (state, payload) => ({
    ...state,
    ...payload,
    tokenExpiry: generateTime(),
    isAuthenticated: true
  }))
  .case(actions.detachSession, state => initialState)
  .case(actions.refreshSession, (state, paylod) => ({
    token: paylod.token,
    refresh: paylod.refresh,
    tokenExpiry: generateTime()
  }));
