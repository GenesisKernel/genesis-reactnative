import actionCreatorFactory from 'typescript-fsa';

import { IEcosystem } from './reducer';

const actionCreator = actionCreatorFactory('ECOSYSTEM');

export const receiveEcosystem = actionCreator<IEcosystem>('RECEIVE');

export const requestEcosystem = actionCreator.async<{ ecosystems: string[] }, IEcosystem>(
  'REQUEST'
);
