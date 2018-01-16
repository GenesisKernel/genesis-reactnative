import { createSelector } from 'reselect';

import { IAlert, IState } from './reducer';

export const getApplication = state => state.application;

export const isVDEMode = state => state.application.isVDEMode;

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
