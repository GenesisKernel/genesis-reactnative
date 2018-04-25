import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface INotification {
  data: INotificationData,
  channel: string;
  uid: string;
  uniqKey: string;
}

export interface IState {
  [uniqKey: string]: INotificationData;
}

const initialState: IState = {

};

export default reducerWithInitialState(initialState)
.case(actions.receiveNotification, (state, payload: INotification) => {
  return {
    ...state,
    [payload.uniqKey]: {
      ...payload.data,
    }
  }
});