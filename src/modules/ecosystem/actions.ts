import actionCreatorFactory from 'typescript-fsa';

import { IEcosystem } from './reducer';

const actionCreator = actionCreatorFactory('ECOSYSTEM');

export const requestEcosystem = actionCreator.async<{ ecosystems: string[] }, IEcosystem>(
  'REQUEST'
);
export const addEcosystemToList = actionCreator<{
  ecosystem: string;
  page?: string;
}>('ADD_ECOSYSTEM_TO_LIST');
