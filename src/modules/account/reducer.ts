import * as actions from './actions';
import { omit } from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { createAccount, removeAccount, attachEcosystem, changePassword } from './actions';

export interface IState {
  [id: string]: IAccount;
}

const initialState: IState = {};

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
  .case(attachEcosystem, (state, payload) => ({
    ...state,
    [`${state[payload.uniqKey].key_id}_${payload.ecosystemId}`]: {
      ...state[payload.uniqKey],
      ecosystem_id: payload.ecosystemId,
      uniqKey: `${state[payload.uniqKey].key_id}_${payload.ecosystemId}`,
    }
  }))
