import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('ACCOUNT');

export const createAccount = actionCreator.async<
  { seed: string; password: string },
  {[uniqKey: string]: IAccount}
>('CREATE');

export const removeAccount = actionCreator.async<{ uniqKey: string }, any>(
  'REMOVE'
);

export const attachEcosystem = actionCreator<{
  uniqKey: string;
  ecosystemId: string;
}>('ATTACH_ECOSYSTEM');

export const changePassword = actionCreator.async<IAccount | string, any>('CHANGE_PASSWORD');

export const cancelChangingPassword = actionCreator('CANCEL_CHANGING_PASSWORD');

export const confirmChangingPassword = actionCreator<string>('CONFIRM_CHANGING_PASSWORD');

export const backupAccount = actionCreator('BACKUP_ACCOUNT');
