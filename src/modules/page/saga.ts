import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import api from 'utils/api';
import { requestPage, requestPreviusPage } from './actions';
import { getPage } from './selectors';
import * as application from 'modules/application';
import { addHistoryMarker } from '../sagas/utils';

export function* pageWorker(action: Action<any>): SagaIterator {
  try {
    const { data } = yield call(
      api.getContentOfPage,
      action.payload.name,
      action.payload.params
    );

    yield put(
      requestPage.done({
        params: action.payload,
        result: data
      })
    );
    yield put(application.actions.receiveCurrentPage(data.name));
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

export function* pageSaga(): SagaIterator {
  yield takeEvery(requestPage.started, pageWorker);
  yield takeEvery(requestPreviusPage, previousPageWorker);
}

export default pageSaga;
