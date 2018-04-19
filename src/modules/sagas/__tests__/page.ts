import { pageWorker, revertHistoryWorker } from '../page';
import { race, take, put } from 'redux-saga/effects';
import { resolveParams, hasHistoryMarker } from '../utils';
import {
  actionTypes as formActionTypes,
  submit as submitForm,
  getFormValues
} from 'redux-form';

import * as application from 'modules/application';
import * as transaction from 'modules/transaction';
import * as page from 'modules/page';
jest.mock('uuid', () => ({
  v4: () => ''
}));

const constantDate = new Date('2017-06-13T04:41:20');

describe('pageWorker resolving pages', () => {
  Date = class extends Date {
    constructor() {
      return constantDate
    }
  } // just because

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('pageWorker -> hasForm = false, !action.payload.contract, !action.payload.page, !action.payload.composite', () => {
    const action = {
      type: application.actions.receivePageParams,
      payload: {},
    }

    const iterator = pageWorker(action);
    iterator.next();
    iterator.next({ nameOfCurrentPage: 'default_page', isVDEMode: false, hasForm: false }); // yield all
    expect(iterator.next().value).toEqual(undefined);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('pageWorker -> hasForm = true, formSubmitResult = failure, !action.payload.contract, !action.payload.page, !action.payload.composite', () => {
    const action = {
      type: application.actions.receivePageParams,
      payload: {},
    }
    const iterator = pageWorker(action);
    iterator.next();
    iterator.next({ nameOfCurrentPage: 'default_page', isVDEMode: false, hasForm: true });
    iterator.next(); // formOfCurrentPage = yield select(getFormValues(nameOfCurrentPage));
    iterator.next(); // yield put(submitForm(nameOfCurrentPage));
    expect(iterator.next().value).toEqual(race({
      success: take(formActionTypes.SET_SUBMIT_SUCCEEDED),
      failure: take(formActionTypes.SET_SUBMIT_FAILED),
    }));
    expect(iterator.next({ formSubmitResult: { failure: true } }).value).toEqual(undefined);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('pageWorker -> hasForm = true, formSubmitResult = success, !action.payload.contract, !action.payload.page, !action.payload.composite', () => {
    const action = {
      type: application.actions.receivePageParams,
      payload: {},
    }
    const iterator = pageWorker(action);
    iterator.next();
    iterator.next({ nameOfCurrentPage: 'default_page', isVDEMode: false, hasForm: true });
    iterator.next(); // formOfCurrentPage = yield select(getFormValues(nameOfCurrentPage));
    iterator.next(); // yield put(submitForm(nameOfCurrentPage));
    expect(iterator.next().value).toEqual(race({
      success: take(formActionTypes.SET_SUBMIT_SUCCEEDED),
      failure: take(formActionTypes.SET_SUBMIT_FAILED),
    }));
    expect(iterator.next({ formSubmitResult: { success: true } }).value).toEqual(undefined);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('pageWorker -> hasForm = true, formSubmitResult = success, action.payload.contract = true, !action.payload.page, !action.payload.composite', () => {
    const action = {
      type: application.actions.receivePageParams,
      payload: {
        contract: 'true',
        params: {},
      },
      meta: {}
    }
    const iterator = pageWorker(action);

    iterator.next();
    iterator.next({ nameOfCurrentPage: 'default_page', isVDEMode: false, hasForm: true });
    iterator.next(); // formOfCurrentPage = yield select(getFormValues(nameOfCurrentPage));
    iterator.next(); // yield put(submitForm(nameOfCurrentPage));

    expect(iterator.next().value).toEqual(race({
      success: take(formActionTypes.SET_SUBMIT_SUCCEEDED),
      failure: take(formActionTypes.SET_SUBMIT_FAILED),
    }));

    expect(iterator.next({ formSubmitResult: { success: true } }).value).toEqual(put(
      transaction.actions.runTransaction.started(
        {
          uuid: '',
          datetime: new Date(),
          contract: action.payload.contract,
          params: {
            ...resolveParams(action.payload.params, {}),
            vde: false
          }
        },
        action.meta
      )
    ));

    expect(iterator.next().value).toEqual(undefined);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('pageWorker -> hasForm = true, formSubmitResult = success, !action.payload.contract, action.payload.page = true, !action.payload.composite', () => {
    const action = {
      type: application.actions.receivePageParams,
      payload: {
        page: 'default_page1',
        params: {},
      },
      meta: {}
    }
    const iterator = pageWorker(action);

    iterator.next();
    iterator.next({ nameOfCurrentPage: 'default_page', isVDEMode: false, hasForm: true });
    iterator.next(); // formOfCurrentPage = yield select(getFormValues(nameOfCurrentPage));
    iterator.next(); // yield put(submitForm(nameOfCurrentPage));

    expect(iterator.next().value).toEqual(race({
      success: take(formActionTypes.SET_SUBMIT_SUCCEEDED),
      failure: take(formActionTypes.SET_SUBMIT_FAILED),
    }));

    expect(iterator.next({ formSubmitResult: { success: true } }).value).toEqual(put(
      page.actions.requestPage.started(
        {
          name: action.payload.page,
          params: {
            ...resolveParams(),
            vde: false,
          }
        },
        action.meta
      )
    ));
    expect(iterator.next().value).toEqual(undefined);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  it('pageWorker -> hasForm = true, formSubmitResult = success, action.payload.contract = true, action.payload.page = true, transactionResult = success, !action.payload.composite', () => {
    const action = {
      type: application.actions.receivePageParams,
      payload: {
        page: 'default_page1',
        contract: 'true',
        params: {},
      },
      meta: {}
    }
    const iterator = pageWorker(action);

    iterator.next();
    iterator.next({ nameOfCurrentPage: 'default_page', isVDEMode: false, hasForm: true });
    iterator.next(); // formOfCurrentPage = yield select(getFormValues(nameOfCurrentPage));
    iterator.next(); // yield put(submitForm(nameOfCurrentPage));

    expect(iterator.next().value).toEqual(race({
      success: take(formActionTypes.SET_SUBMIT_SUCCEEDED),
      failure: take(formActionTypes.SET_SUBMIT_FAILED),
    }));

    iterator.next({ formSubmitResult: { success: true } }) // TRANSACTION RUN STARTED
    iterator.next() // transactionResult RACE

    expect(iterator.next({ transactionResult: { success: {} } }).value).toEqual(put(
      page.actions.requestPage.started(
        {
          name: action.payload.page,
          params: {
            ...resolveParams(),
            vde: false,
          }
        },
        action.meta
      )
    ));
    expect(iterator.next().value).toEqual(undefined);
  });

  it('action.payload.composite && !, !action.payload.contract', () => {
    const action = {
      type: application.actions.receivePageParams,
      payload: {
        composite: {},
      },
      meta: {}
    }
    const iterator = pageWorker(action);

    iterator.next();
    iterator.next({ isVDEMode: false, hasForm: false });
    iterator.next() // put(transaction.actions.runCompositeContracts.started)
    expect(iterator.next().value).toEqual(undefined);
  });

  it('action.payload.composite && !, !action.payload.contract, failed', () => {
    const action = {
      type: application.actions.receivePageParams,
      payload: {
        composite: {},
        contract: 'true',
      },
      meta: {}
    }
    const iterator = pageWorker(action);

    iterator.next();
    iterator.next({ isVDEMode: false, hasForm: false });
    iterator.next() // put(transaction.actions.runCompositeContracts.started)
    iterator.next();
    expect(iterator.next({ failed: {} }).value).toEqual(undefined);
  });

  it('action.payload.composite && !, !action.payload.contract, done', () => {
    const action = {
      type: application.actions.receivePageParams,
      payload: {
        composite: {},
        contract: 'true',
      },
      meta: {}
    }
    const iterator = pageWorker(action);

    iterator.next();
    iterator.next({ isVDEMode: false, hasForm: false });
    iterator.next() // put(transaction.actions.runCompositeContracts.started)
    iterator.next();
    iterator.next({ done: {} });
    iterator.next(); // put(transaction.actions.runTransaction.started)
    expect(iterator.next().value).toEqual(undefined);
  });
});


describe('revertHistoryWorker', () => {
  const action = {
    type: application.actions.menuBackAction,
    payload: {name: 'default_page' }
  }
  it('revertHistoryWorker, lastPage = true, history.length > 1', () => {
    const iterator = revertHistoryWorker(action);
    const history = [{}, { name: 'test' }, {}];
    iterator.next();

    expect(iterator.next(history).value).toEqual(put(page.actions.requestPreviusPage({ name: 'test' })));
    expect(iterator.next().value).toEqual(put(application.actions.revertHistory()));
  });
})