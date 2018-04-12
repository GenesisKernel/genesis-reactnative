import { call, put, takeEvery, select, take } from 'redux-saga/effects';
import { fullNodes } from '../../fullNodes';
import { filterDuplicateNodes } from '../sagas/utils';
import api, { apiSetUrl, apiSetToken, apiDeleteToken } from '../../utils/api';

import * as application from 'modules/application';
import * as auth from 'modules/auth';
import * as node from 'modules/nodes';

export function* nodesWorker() {
  const nodesList = yield select(node.selectors.getNodesList);
  const filteredNodes = yield call(filterDuplicateNodes, !!nodesList.length ? nodesList : fullNodes);
  const randomNode = filteredNodes[Math.floor(Math.random() * filteredNodes.length)];
  console.log(Math.floor(Math.random() * filteredNodes.length), 'randomNode', nodesList, 'nodes list')
  apiSetUrl(`${randomNode.apiUrl}api/v2`);

  yield put(node.actions.setCurrentNode(randomNode));
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
  const newNodes = allNodes.concat(nodes.map((item: any) => {
    return {
      apiUrl: item[1],
    }
  }));

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
  yield call(nodesWorker);
  yield takeEvery(application.actions.initFinish, getFullNodesWorker);
}