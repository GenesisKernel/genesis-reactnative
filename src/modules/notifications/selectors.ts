import { createSelector } from 'reselect';
import { path } from 'ramda';

import { IRootState } from 'modules';
import { IState as AccountReduceState } from './reducer';

export const getNotifications = createSelector(
  (state: IRootState) => state.notifications,
  (notifications: AccountReduceState) => notifications,
);

export const getNotificationsCount = createSelector(
  (state: IRootState) => state.notifications,
  (state: IRootState) => state.auth.currentAccount,
  (notifications: AccountReduceState, currentAccount: any) => path([`${currentAccount}, count`], notifications),
);