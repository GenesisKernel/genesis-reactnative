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
  currentLocale: string | null;
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
    [uniqKey: string]: boolean;
  };
  channelSubscribedAccounts: {
    [uniqKey: string]: boolean;
  };
  privateKey: null | {
    privateKey: string;
    expireTime: number;
  };
  modalType: null | string;
  drawerOpen: boolean;
}

export const initialState: IState = {
  currentLocale: null,
  isStarted: false,
  isVDEMode: false,
  socketConnectedAccounts: {},
  channelSubscribedAccounts: {},
  title: DEFAULT_TITLE,
  history: [],
  network: {
    pending: false
  },
  privateKey: null,
  modalType: null,
  drawerOpen: false,
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
      [payload.uniqKey]: payload.status,
    }
  }))
  .case(actions.setChannelSubscribtionStatus, (state, payload) => ({
    ...state,
    channelSubscribedAccounts: {
      ...state.channelSubscribedAccounts,
      [payload.uniqKey]: payload.status,
    }
  }))
  .case(actions.closeModal, (state) => ({
    ...state,
    modalType: null,
  }))
  .case(actions.showModal, (state, payload: any) => ({
    ...state,
    modalType: payload,
  }))
  .case(actions.setPrivateKey, (state, payload) => ({
    ...state,
    privateKey: payload,
  }))
  .case(actions.toggleDrawer, (state,payload: any) => ({
    ...state,
    drawerOpen: payload,
  }))
  .case(actions.setCurrentLocale, (state, payload: string) => ({
    ...state,
    currentLocale: payload,
  }))