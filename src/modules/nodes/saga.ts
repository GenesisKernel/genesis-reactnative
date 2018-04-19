import { call, put, takeEvery, select, take, all } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';

import { fullNodes } from '../../fullNodes';
import { filterDuplicateNodes } from '../sagas/utils';
import api, { apiSetUrl, apiSetToken, apiDeleteToken } from '../../utils/api';

import * as application from 'modules/application';
import * as auth from 'modules/auth';
import * as node from 'modules/nodes';


export function* nodesWorker() {
  const currentNode = yield select(node.selectors.getCurrentNode);

  if (currentNode) {
    try {
      apiSetUrl(`${currentNode.apiUrl}api/v2`);
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
    nodesList: select(node.selectors.getNodesList),
    isAuthenticated: select(auth.selectors.getAuthStatus),
  });

  const filteredNodes = !!nodesList.length ? nodesList : yield call(filterDuplicateNodes, fullNodes);
  yield call(checkNodeValidity, filteredNodes);

  if (isAuthenticated) yield put(auth.actions.detachSession());
}

export function* checkNodeValidity(allNodes: any) {
  while(true) {
    try {
      const randomNode = allNodes[Math.floor(Math.random() * allNodes.length)];
      apiSetUrl(`${randomNode.apiUrl}api/v2`);
      yield call(api.getUid);
      yield put(node.actions.setCurrentNode(randomNode));
      return;
    } catch(err) {
      console.log(err, 'err')
    }
  }
}

export function* getFullNodesWorkerHelper() {
  try {
    const { data: { list } } = yield call(api.getFullNodes);
    const nodesList = yield select(node.selectors.getNodesList);

    let nodes = [];

    try {
      nodes = JSON.parse(list[0].value);
    } catch(err) {
      // console.log(err, 'ERROR AT getFullNodesWorkerHelper');
    }

    const allNodes = nodesList.concat(fullNodes);
    const newNodes = yield call(filterDuplicateNodes, allNodes.concat(nodes.map((item: any) => {
      return {
        apiUrl: item[1],
      }
    })));

    yield put(node.actions.setNodesList(newNodes));
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