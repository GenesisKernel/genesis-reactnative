import actionCreatorFactory from 'typescript-fsa';

import { IAlert, IHistory } from './reducer';

const actionCreator = actionCreatorFactory('APPLICATION');

export const initStart = actionCreator('START');
export const initFinish = actionCreator('FINISH');

export const receiveQRCode = actionCreator<string>('RECEIVE_QRCOE');

export const importSeed = actionCreator('IMPORT_SEED');
export const exportSeed = actionCreator('EXPORT_SEED');
export const receiveSeed = actionCreator<string>('RECEIVE_SEED');
export const generateSeed = actionCreator('GENERATE_SEED');
export const removeSeed = actionCreator('REMOVE_SEED');

export const checkForTouchID = actionCreator<Boolean>('CHECK_FOR_TOUCH_ID');
export const receiveCurrentPage = actionCreator<string>('RECEIVE_CURRENT_PAGE');
export const receivePageParams = actionCreator<{
  vde?: boolean;
  page?: string;
  contract?: string;
  params?: { [name: string]: any };
  pageparams?: { [name: string]: any };
}>('RECEIVE_PAGE_PARAMS');

export const receiveAlert = actionCreator<IAlert>('RECEIVE_ALERT');
export const cancelAlert = actionCreator('CANCEL_ALERT');
export const confirmAlert = actionCreator('CONFIRM_ALERT');

export const strartNetworkRequest = actionCreator<string>(
  'STRART_NETWORK_REQUEST'
);
export const finishNetworkRequest = actionCreator('FINISH_NETWORK_REQUEST');

export const receiveTitle = actionCreator<string>('RECEIVE_TITLE');

export const receiveHistory = actionCreator<IHistory>('RECEIVE_HISTORY');
export const revertHistory = actionCreator('REVERT_HISTORY');

export const menuBackAction = actionCreator('MENU_BACK_ACTION');

export const receiveInstallId = actionCreator('RECEIVE_INSTALL_ID');
export const receivePushNotification = actionCreator(
  'RECEIVE_PUSH_NOTIFICATION'
);

export const receiveVDEMode = actionCreator<boolean>('TOGGLE_VDE_MODE');
