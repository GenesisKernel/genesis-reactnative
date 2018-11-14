import { call, put, takeEvery, select, take, all } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';

import { fullNodes } from '../../fullNodes';
import { filterDuplicateNodes } from '../sagas/utils';
import { checkNodeValidity } from 'modules/sagas/sagaHelpers';
import api, { apiSetUrl, apiSetToken, apiDeleteToken } from '../../utils/api';

import * as application from 'modules/application';
import * as auth from 'modules/auth';
import * as nodesSelectors from './selectors';
import * as nodesActions from './actions';


export function* nodesWorker() {
  const { currentNode, isAuthenticated } = yield all({
    currentNode: select(nodesSelectors.getCurrentNode),
    isAuthenticated: select(auth.selectors.getAuthStatus)
  });

  if (currentNode && isAuthenticated) {
    try {
      apiSetUrl(`${currentNode.apiUrl}`);
      yield call(api.getUid);
      yield put(application.actions.initStart());
      return;
    } catch(err) {
      yield call(setRandomNode);
    }
  } else {
    yield call(setRandomNode);
  }

  yield put(application.actions.initStart());
}

export function* setRandomNode() {
  const { nodesList, isAuthenticated } = yield all({
    nodesList: select(nodesSelectors.getNodesList),
    isAuthenticated: select(auth.selectors.getAuthStatus),
  });

  const filteredNodes = !!nodesList.length ? nodesList : yield call(filterDuplicateNodes, fullNodes);

  const checkedNodes = yield call(checkNodeValidity, filteredNodes, 1);

  yield put(nodesActions.setCurrentNode(checkedNodes[0]));

  if (isAuthenticated) yield put(auth.actions.detachSession());
}

export function* getFullNodesWorkerHelper() {
  try {
    const { data: { list } } = yield call(api.getFullNodes);

    const nodesList = yield select(nodesSelectors.getNodesList);

    let nodes = [];

    try {
      nodes = JSON.parse(list[0].value);
    } catch(err) {

    }

    const allNodes = nodesList.concat(fullNodes);
    const newNodes = yield call(filterDuplicateNodes, allNodes.concat(nodes.map((item: any) => {
      return {
        apiUrl: `${item.api_address}/api/v2`,
      }
    })));

    yield put(nodesActions.setNodesList(newNodes));
  } catch(err) {
    yield put(auth.actions.logout());
  }
}

export function* getFullNodesWorker() {
  const isAuthenticated = yield select(auth.selectors.getAuthStatus);

  if (isAuthenticated) {
    yield call(getFullNodesWorkerHelper);
  } else {
    yield take(auth.actions.attachSession);
    yield call(getFullNodesWorkerHelper);
    return;
  }

}

export default function* nodesSaga() {
  yield takeEvery(REHYDRATE, nodesWorker);
  yield takeEvery(application.actions.initFinish, getFullNodesWorker);
  yield takeEvery(auth.actions.receiveSelectedAccount.started, setRandomNode);
}
