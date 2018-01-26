import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface INotification {
  data: {
    role_id: number;
    ecosystem: number;
    count: number;
  },
  address: string;
}

export interface IState {
  [id: string]: {
    role_id: number;
    ecosystem: number;
    count: number;
  };
}

const initialState: IState = {
};

export default reducerWithInitialState(initialState)
.case(actions.receiveNotification, (state, payload: INotification) => {
  return {
    ...state,
    [payload.address]: {
      ...payload.data,
    },
  };
});