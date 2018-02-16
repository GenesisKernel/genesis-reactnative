import { Action } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';

export interface ITransaction {
  id?: string;
  uuid: string;
  block?: string;
  error?: any;
  contract: string;
  datetime: Date;
  params?: { [name: string]: any };
  meta?: {
    initiator?: string;
  } | null;
  fullForsign: string;
}

export interface IState {
  [uuid: string]: ITransaction;
}

const initialState: IState = {};

export default reducerWithInitialState(initialState)
  .case(actions.confirmNestedContracts, (state, payload) => ({
    ...state,
    fullForsign: payload.fullForsign,
    signParams: payload.signParams,
  }))
  .caseWithAction(
    actions.runTransaction.started,
    (state, { payload, meta }) => ({
      ...state,
      [payload.uuid]: {
        ...payload,
        meta
      }
    })
  )
  .case(actions.runTransaction.done, (state, payload) => ({
    ...state,
    [payload.params.uuid]: {
      ...state[payload.params.uuid],
      ...payload.result
    }
  }))
  .case(actions.runTransaction.failed, (state, payload) => ({
    ...state,
    [payload.params.uuid]: {
      ...state[payload.params.uuid],
      error: payload.error
    }
  }));
