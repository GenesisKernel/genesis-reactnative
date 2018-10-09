import * as actions from './actions';
import { Action } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { requestPage, setStaticPage } from './actions';

export interface IMenu {
  tag: string;
  attr: {
    icon?: string;
    title: string;
    page: string;
  };
  children: IMenu[];
}

export interface IPage {
  name: string;
  tree?: any;
  menuTree?: IMenu[];
  params?: { [name: string]: any };
}

export interface IStaticPage {
  name: string;
  ecosystem: string;
  page?: string;
}

export interface IState {
  isFetching: boolean;
  items: { [name: string]: IPage };
  staticPages: { [name: string]: IStaticPage };
}

const initialState: IState = {
  isFetching: false,
  items: {},
  staticPages: {}
};

export default reducerWithInitialState<IState>(initialState)
  .case(requestPage.started, state => ({
    ...state,
    isFetching: true
  }))
  .case(requestPage.failed, state => ({
    ...state,
    isFetching: false
  }))
  .case(requestPage.done, (state, payload) => ({
    ...state,
    isFetching: false,
    items: {
      ...state.items,
      [payload.result.name]: {
        ...payload.result,
        params: payload.params.params
      }
    }
  }))
  .case(setStaticPage, (state, payload) => ({
    ...state,
    isFetching: false,
    staticPages: {
      ...state.staticPages,
      [payload.name]: {
        ...state.staticPages.payload,
        name: payload.name,
        ecosystem: payload.ecosystem,
        page: payload.page
      }
    }
  }));
