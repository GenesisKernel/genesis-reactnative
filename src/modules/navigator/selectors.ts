import { createSelector } from 'reselect';

export const getCurrentRoute = createSelector(
  state => state.navigation,
  navigation => navigation.routes[navigation.index],
);