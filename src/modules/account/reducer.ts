import * as actions from './actions';
import { Action } from 'redux';
import { mergeDeepWith, union, omit } from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createAccount, removeAccount, attachEcosystem } from './actions';

export interface IAccout {
  id: string;
  address: string;
  state: string;
  ecosystems: string[];
  encKey: string;
  publicKey: string;
}

export interface IState {
  [id: string]: IAccout;
}

const initialState: IState = {};

const mergeAccount = mergeDeepWith<IAccout, Partial<IAccout>>(union);

export default reducerWithInitialState(initialState)
  .case(createAccount.done, (state, payload) => ({
    ...state,
    [payload.result.id]: payload.result
  }))
  .case(removeAccount.done, (state, payload) => omit([payload.params.accountId])(state))
  .case(attachEcosystem, (state, payload) => ({
    ...state,
    [payload.accountId]: mergeAccount(state[payload.accountId], {
      ecosystems: [payload.ecosystemId]
    })
  }));
