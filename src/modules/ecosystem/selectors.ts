import { createSelector } from 'reselect';

export const getEcosystems = createSelector(
  state => state.ecosystems,
  items => items
);

export const getEcosystem = (id: string) =>
  createSelector(state => state.ecosystems, items => items[id]);
