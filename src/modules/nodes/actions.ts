import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('NODES');

export const setCurrentNode = actionCreator<INode>('SET_CURRENT_NODE');
export const setNodesList = actionCreator<INode[]>('SET_NODES_LIST');