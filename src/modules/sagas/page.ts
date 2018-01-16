import { last } from 'ramda';
import { SagaIterator, delay } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call, select, take, race } from 'redux-saga/effects';
import {
  actionTypes as formActionTypes,
  submit as submitForm,
  getFormValues
} from 'redux-form';
import * as uuid from 'uuid';

import * as page from 'modules/page';
import * as application from 'modules/application';
import * as transaction from 'modules/transaction';
import { resolveParams, hasHistoryMarker } from './utils';

export function* pageWorker(action: Action<any>): SagaIterator {
  const nameOfCurrentPage = yield select(page.selectors.getNameOfCurrentPage);
  const isVDEMode = yield select(application.selectors.isVDEMode);
  const vde = action.payload.vde !== undefined ? action.payload.vde : isVDEMode;
  let formOfCurrentPage;

  yield put(application.actions.receiveVDEMode(vde));

  if (yield select(page.selectors.hasForm)) {
    formOfCurrentPage = yield select(getFormValues(nameOfCurrentPage));

    yield put(submitForm(nameOfCurrentPage));

    const formSubmitResult = yield race({
      success: take(formActionTypes.SET_SUBMIT_SUCCEEDED),
      failure: take(formActionTypes.SET_SUBMIT_FAILED),
      timeout: call(delay, 3000)
    });

    if (formSubmitResult.failure || formSubmitResult.timeout) {
      return;
    }
  }

  if (action.payload.contract) {
    yield put(
      transaction.actions.runTransaction.started(
        {
          uuid: uuid.v4(),
          datetime: new Date(),
          contract: action.payload.contract,
          params: {
            ...resolveParams(action.payload.params, formOfCurrentPage),
            ...formOfCurrentPage,
            vde
          }
        },
        action.meta
      )
    );
  }

  if (action.payload.page) {
    // Wait when transaction will done
    const transactionResult =
      action.payload.contract &&
      (yield race({
        success: take(transaction.actions.runTransaction.done),
        failure: take(transaction.actions.runTransaction.failed),
        timeout: call(delay, 3000)
      }));

    // Stop page loading if transaction was failed
    if (transactionResult && transactionResult.failure) {
      return;
    }

    if (transactionResult && transactionResult.timeout) {
      yield put(
        application.actions.receiveAlert({
          message: 'Timeout!',
          type: 'error'
        })
      );

      return;
    }

    yield put(
      page.actions.requestPage.started(
        {
          name: action.payload.page,
          params: {
            ...resolveParams(action.payload.pageparams, formOfCurrentPage),
            vde
          }
        },
        action.meta
      )
    );
  }
}

export function* historyWorker(action: Action<any>): SagaIterator {
  if (hasHistoryMarker(action)) {
    return;
  }

  yield put(
    application.actions.receiveHistory({
      ...action.payload
    })
  );
}

export function* revertHistoryWorker(action: Action<any>): SagaIterator {
  const history = yield select(application.selectors.getHistory);
  const lastPage = history[history.length - 2]; // Get previous page

  if (lastPage) {
    yield put(page.actions.requestPreviusPage(lastPage));

    if (history.length > 1) {
      // Do not remove first item in the history stack
      yield put(application.actions.revertHistory());
    }
  }
}

export default function* transactionSaga(): SagaIterator {
  yield takeEvery(page.actions.requestPage.started, historyWorker);
  yield takeEvery(application.actions.receivePageParams, pageWorker);
  yield takeEvery(application.actions.menuBackAction, revertHistoryWorker);
}
