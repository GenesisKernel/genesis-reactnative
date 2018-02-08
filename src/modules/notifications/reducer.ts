import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface INotification {
  data: {
    role_id: number;
    ecosystem: number;
    count: number;
  },
  channel: string;
  uid: string;
  address: string;
}

export interface IState {
  groupedByEcosystemId: {
    [id: string]: {
      role_id: number;
      ecosystem: number;
      count: number;
    };
  };
}

const initialState: IState = {
  groupedByEcosystemId: {},
};

export default reducerWithInitialState(initialState)
.case(actions.receiveNotification, (state, payload: INotification) => {
  return {
    ...state,
    groupedByEcosystemId: {
      [payload.data.ecosystem]: {
        ...state.groupedByEcosystemId[payload.data.ecosystem],
        [payload.address]: {
          ...payload.data
        }
      }
    }
  }
});