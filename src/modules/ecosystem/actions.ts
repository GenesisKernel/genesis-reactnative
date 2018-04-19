import actionCreatorFactory from 'typescript-fsa';

import { IEcosystem } from './reducer';

const actionCreator = actionCreatorFactory('ECOSYSTEM');

export const requestEcosystem = actionCreator.async<{ ecosystems: string[] }, IEcosystem>(
  'REQUEST'
);
