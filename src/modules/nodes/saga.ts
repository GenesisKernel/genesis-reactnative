import { call, put, takeEvery, select, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';

import { fullNodes } from '../../fullNodes';
import { filterDuplicateNodes } from '../sagas/utils';
import api, { apiSetUrl, apiSetToken, apiDeleteToken } from '../../utils/api';

import * as application from 'modules/application';
import * as auth from 'modules/auth';
import * as node from 'modules/nodes';


export function* nodesWorker() {
  const randomNode = yield call(getRandomNode);
  const currentNode = yield select(node.selectors.getCurrentNode);
  //  here will be node check
  apiSetUrl(`${randomNode.apiUrl}api/v2`);

  yield put(node.actions.setCurrentNode(randomNode));
  yield put(application.actions.initStart());
}

export function* getRandomNode() {
  const nodesList = yield select(node.selectors.getNodesList);
  const filteredNodes = !!nodesList.length ? nodesList : yield call(filterDuplicateNodes, fullNodes);
  const randomNode = filteredNodes[Math.floor(Math.random() * filteredNodes.length)];

  return randomNode;
}

export function* getFullNodesWorkerHelper() {
  const { data: { list } } = yield call(api.getFullNodes);
  const nodesList = yield select(node.selectors.getNodesList);

  let nodes = [];

  try {
    nodes = JSON.parse(list[0].value);
  } catch(err) {
    console.log(err, 'ERROR AT getFullNodesWorkerHelper');
  }

  const allNodes = !!nodesList.length ? nodesList : fullNodes;
  const newNodes = yield call(filterDuplicateNodes, allNodes.concat(nodes.map((item: any) => {
    return {
      apiUrl: item[1],
    }
  })));

  yield put(node.actions.setNodesList(newNodes));
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
}