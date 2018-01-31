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
  (state: IRootState) => state.auth.currentEcosystemId,
  (state: IRootState) => state.auth.currentAccountAddress,
  (notifications: AccountReduceState, currentEcosystemId: any, currentAccountAddress: any) => path(['groupedByEcosystemId', `${currentEcosystemId}`, `${currentAccountAddress}`, 'count'], notifications)
);