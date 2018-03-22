import { createSelector } from 'reselect';

import { IAlert, IState } from './reducer';

export const getApplication = state => state.application;

export const isVDEMode = state => state.application.isVDEMode;

export const getTouchIdStatus = state => state.application.touchIdSupport;

export const getCurrentPageId = createSelector(
  getApplication,
  application => application.currentPageId
);

export const getTitle = createSelector(
  getApplication,
  application => application.title
);

export const getAlert = createSelector<any, any, IAlert>(
  getApplication,
  application => application.alert
);

export const hasPendingRequest = createSelector(
  getApplication,
  application => application.network.pending
);

export const getHistory = createSelector(
  getApplication,
  application => application.history
);

export const getSocketConnectedAccounts = createSelector(
  getApplication,
  application => application.socketConnectedAccounts,
);

export const getChannelSubscribedAccounts = createSelector(
  getApplication,
  application => application.channelSubscribedAccounts,
);

export const getPrivateKey = createSelector(
  getApplication,
  application => application.privateKey,
);

export const getDrawerState = createSelector(
  getApplication,
  application => application.drawerOpen,
);

export const getCurrentLocale = createSelector(
  getApplication,
  application => application.currentLocale
)