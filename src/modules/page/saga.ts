import { SagaIterator } from 'redux-saga';
import { Action } from 'typescript-fsa';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import api from 'utils/api';
import { requestPage, requestPreviusPage, requestPageWithoutRendering } from './actions';
import { getPage } from './selectors';
import * as application from 'modules/application';
import { addHistoryMarker } from '../sagas/utils';

const kostyl = JSON.parse(`{"name":"notifications","tree":[{"tag":"div","attr":{"class":"content-wrapper"},"children":[{"tag":"text","text":"Notifications"},{"tag":"div","attr":{"class":"breadcrumb"},"children":[{"tag":"span","attr":{"class":"text-muted"},"children":[{"tag":"text","text":"Notifications"}]}]},{"tag":"dbfind","attr":{"columns":[],"data":[],"name":"roles_assign","source":"src_roles","types":[],"where":"member_id=4192126622590966493"}},{"tag":"forlist","attr":{"source":"src_roles"}},{"tag":"dbfind","attr":{"columns":[],"data":[],"name":"notifications","order":"closed ASC, id ASC","source":"src_notifications","types":[],"where":"recipient_id=4192126622590966493"}}]},{"tag":"div","attr":{"class":"md-12 panel panel-primary data-sweet-alert"},"children":[{"tag":"div","attr":{"class":"list-group-item"},"children":[{"tag":"div","attr":{"class":"table-responsive"},"children":[{"tag":"table","attr":{"columns":[{"Name":"custom_id","Title":"ID"},{"Name":"custom_recipient","Title":"Recipient"},{"Name":"custom_icon","Title":"Icon"},{"Name":"custom_page","Title":"Page name"},{"Name":"custom_val_int","Title":"Value number"},{"Name":"custom_val_str","Title":"Value string"},{"Name":"custom_date","Title":"Closed"},{"Name":"custom_status","Title":"Status"},{"Name":"actions","Title":"Actions"}],"source":"src_notifications"}}]}]}]}],"menuTree":[{"tag":"menuitem","attr":{"icon":"fa icon-people","page":"members_list","title":"Membership"}},{"tag":"menuitem","attr":{"icon":"fa icon-list","page":"roles_list","title":"Roles"}}]}`);

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
