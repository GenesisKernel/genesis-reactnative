import { equals } from 'ramda';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import * as actions from './actions';
import { DEFAULT_TITLE } from '../../constants';

export interface INetwork {
  pending: boolean;
  initiator?: string;
}

export interface IAlert {
  title?: string;
  type: 'default' | 'error' | 'warning';
  message: string;
}

export interface IHistory {
  name: string;
  params: { [name: string]: string };
}

export interface IState {
  seed?: string;
  isStarted?: boolean;
  currentPageId?: string;
  currentMenuId?: string;
  title?: string;
  alert?: IAlert;
  network: INetwork;
  history: IHistory[];
  installId?: string;
  isVDEMode: boolean;
  socketConnectedAccounts: {
    [addres: string]: boolean;
  };
  channelSubscribedAccounts: {
    [addres: string]: boolean;
  };
  nestedContractModalData: object | null;
}

export const initialState: IState = {
  isStarted: false,
  isVDEMode: false,
  socketConnectedAccounts: {},
  channelSubscribedAccounts: {},
  title: DEFAULT_TITLE,
  history: [],
  network: {
    pending: false
  },
  nestedContractModalData: null,
};

export default reducerWithInitialState<IState>(initialState)
  .case(actions.initFinish, state => ({
    ...state,
    isStarted: true
  }))
  .case(actions.receiveInstallId, (state, installId) => ({
    ...state,
    installId
  }))
  .case(actions.receiveCurrentPage, (state, currentPageId) => ({
    ...state,
    currentPageId
  }))
  .case(actions.receiveSeed, (state, seed) => ({
    ...state,
    seed
  }))
  .case(actions.removeSeed, (state) => ({ ...state, seed: undefined }))
  .case(actions.receiveTitle, (state, title) => ({ ...state, title }))
  .case(actions.receiveAlert, (state, alert) => ({
    ...state,
    alert
  }))
  .case(actions.checkForTouchID, (state, isSupports) => ({ ...state, touchIdSupport: isSupports }))
  .cases([actions.cancelAlert, actions.confirmAlert], state => ({
    ...state,
    alert: undefined
  }))
  .case(actions.strartNetworkRequest, (state, initiator) => ({
    ...state,
    network: { pending: true, initiator }
  }))
  .case(actions.finishNetworkRequest, state => ({
    ...state,
    network: { pending: false }
  }))
  .case(actions.receiveHistory, (state, history) => {
    if (state.history.findIndex(item => equals(item, history)) !== -1) {
      return { ...state };
    }

    return {
      ...state,
      history: [...state.history, history]
    };
  })
  .case(actions.revertHistory, state => ({
    ...state,
    history: [...state.history.slice(0, -1)]
  }))
  .case(actions.receiveVDEMode, (state, isVDEMode = false) => ({
    ...state,
    isVDEMode
  }))
  .case(actions.setSocketConnectionStatus, (state, payload) => ({
    ...state,
    socketConnectedAccounts: {
      ...state.socketConnectedAccounts,
      [payload.accountAddress]: payload.status,
    }
  }))
  .case(actions.setChannelSubscribtionStatus, (state, payload) => ({
    ...state,
    channelSubscribedAccounts: {
      ...state.channelSubscribedAccounts,
      [payload.accountAddress]: payload.status,
    }
  }))
  .case(actions.showNestedContractSigningModal, (state, payload) => ({
    ...state,
    nestedContractModalData: payload,
  }))
  .case(actions.cancelNestedContractSignin, (state) => ({
    ...state,
    nestedContractModalData: null,
  }))
