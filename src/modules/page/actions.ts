import actionCreatorFactory from 'typescript-fsa';

import { IPage } from './reducer';

const actionCreator = actionCreatorFactory('PAGE');

export interface IPagePayload {
  name: string;
  params?: {
    vde?: boolean;
    [name: string]: any;
  };
}

export interface IStaticPagePayload {
  name: string;
  params?: any;
}

export const requestPage = actionCreator.async<IPagePayload, IPage>('REQUEST');

export const requestPreviusPage = actionCreator<IPagePayload>(
  'REQUEST_PREVIUS_PAGE'
);

export const setStaticPage = actionCreator<IStaticPagePayload>(
  'STATIC'
);

export const requestPageWithoutRendering = actionCreator<any>('REQUEST_PAGE_WITHOUT_RENDERING');
