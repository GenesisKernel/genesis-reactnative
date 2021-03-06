import { createSelector } from 'reselect';
import { path } from 'ramda';

import { IRootState } from 'modules';
import { IState as AccountReduceState } from './reducer';

export const getNotifications = createSelector(
  (state: IRootState) => state.notifications,
  (notifications: AccountReduceState) => notifications,
);

export const getNotificationsCount = (state: any) => path(['notifications', `${state.auth.currentAccount}`, 'count'], state);

export const getNotification = (state: any, uniqKey: any) => state.notifications[uniqKey];
