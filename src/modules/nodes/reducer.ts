import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';

export interface IState {
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
}))
.case(actions.setNodesList, (state, payload: INode[]) => ({
  ...state,
  nodesList: payload,
}))