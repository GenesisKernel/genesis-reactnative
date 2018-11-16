import actionCreatorFactory from 'typescript-fsa';
import { INotification } from './reducer';

const actionCreator = actionCreatorFactory('NOTIFICATIONS');

export const receiveNotification = actionCreator<INotification>('RECEIVE_NOTIFICATION');
