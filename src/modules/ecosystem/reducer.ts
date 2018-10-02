import * as actions from './actions';
import { Action } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { requestEcosystem } from './actions';

export interface IParameter {
  name: string;
  value: string;
  conditions: string;
  ecosystem_name?: string;
}

export interface IEcosystem {
  id: string;
  parameters: IParameter[];
}

export interface IState {
  [id: string]: IEcosystem;
}

const initialState: IState = {};

export default reducerWithInitialState(initialState).case(
  requestEcosystem.done,
  (state: IState, payload): IState => ({
    ...state,
    [payload.result.id]: payload.result
  })
);
