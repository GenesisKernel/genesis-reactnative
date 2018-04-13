import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';

export interface IState {
  lastCheck?: number;
  currentNode?: INode;
  nodesList: INode[];
}

const initialState: IState = {
  nodesList: [],
};

export default reducerWithInitialState(initialState)

.case(actions.setCurrentNode, (state, payload: INode) => ({
  ...state,
  currentNode: payload,
  lastCheck: Date.now(),
}))
.case(actions.setNodesList, (state, payload: INode[]) => ({
  ...state,
  nodesList: payload,
  lastCheck: Date.now(),
}))