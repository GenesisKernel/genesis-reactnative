import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import api from 'utils/api';
import { requestPage, requestPreviusPage, requestPageWithoutRendering, setStaticPage } from './actions';
import { getPage } from './selectors';
import * as application from 'modules/application';
import { addHistoryMarker } from '../sagas/utils';

import { STATIC_PAGES } from '../../constants';

export function* pageWorker(action: Action<any>): SagaIterator {

  try {
    if (STATIC_PAGES.indexOf(action.payload.name) !== -1) {
      yield put(
        setStaticPage({
          name: action.payload.name,
          params: action.payload.params || {},
        })
      );
      yield put(application.actions.receiveCurrentPage(action.payload.name));
      yield put(application.actions.receiveTitle(action.payload.name));
      return;
    }
    const locale = yield select(application.selectors.getCurrentLocale);
    const { data } = yield call(
      api.getContentOfPage,
      action.payload.name,
      { ...action.payload.params, lang: locale }
    );

    yield put(
      requestPage.done({
        params: action.payload,
        result: data
      })
    );
    if (!action.payload.dontRender) {
      yield put(application.actions.receiveCurrentPage(data.name));
    }
  } catch (error) {
    yield put(
      requestPage.failed({
        params: action.payload,
        error
      })
    );
  }
}

export function* previousPageWorker(action: Action<any>): SagaIterator {
  yield put(
    application.actions.receiveVDEMode(
      action.payload.params && action.payload.params.vde
    )
  );
  yield put(
    addHistoryMarker(
      requestPage.started({
        ...action.payload
      })
    )
  );
}

export function* requestPageWithoutRenderingWorker(action: Action<any>): SagaIterator {
  yield call(pageWorker, action);
}

export function* pageSaga(): SagaIterator {
  yield takeEvery(requestPage.started, pageWorker);
  yield takeEvery(requestPreviusPage, previousPageWorker);
  yield takeEvery(requestPageWithoutRendering, requestPageWithoutRenderingWorker);
}

export default pageSaga;
