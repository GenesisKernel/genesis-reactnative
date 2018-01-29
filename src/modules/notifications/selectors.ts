import { createSelector } from 'reselect';

import { IRootState } from 'modules';
import { IState as AccountReduceState } from './reducer';

export const getNotifications = createSelector(
  (state: IRootState) => state.notifications,
  (notifications: AccountReduceState) => notifications,
);