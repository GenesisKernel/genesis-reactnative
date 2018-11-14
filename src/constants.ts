import { Platform } from 'react-native';

export const URL_PREFIX = Platform.OS === 'android' ? 'apla://apla/' : 'apla://';

export const DEFAULT_PAGE = 'default_page';
export const DEFAULT_TITLE = 'Home';
export const MODAL_ANIMATION_TIME = 350;
export const REQUIRED_ALIVE_NODES_COUNT = 2;
export const EMAIL = 'apla@snapswap.eu';
export const GUEST_KEY_PAIR = {
  private: "e5a87a96a445cb55a214edaad3661018061ef2936e63a0a93bdb76eb28251c1f",
  public: "--489347a1205c818d9a02f285faaedd0122a56138e3d985f5e1b4f6a9470f90f692a00a3453771dd7feea388ceb7aefeaf183e299c70ad1aecb7f870bfada3b86", // -- in the beginning of the string because in api.login we got slice(2) for publicKey, its not a part of key
};

export const NAV = {
  AUTH: 'AUTH',
  MAIN: 'MAIN'
};

export const navTypes = {
  AUTH: `${NAV.AUTH}/HOME`,
  SCANNER: `${NAV.AUTH}/SCANNER`,
  SIGN_IN: `${NAV.AUTH}/SIGN_IN`,
  IMPORT_ACCOUNT: `${NAV.AUTH}/IMPORT_ACCOUNT`,
  SIGN_UP_CONFIRM: `${NAV.AUTH}/SIGN_UP_CONFIRM`,
  SIGN_UP_WARNING: `${NAV.AUTH}/SIGN_UP_WARNING`,
  SIGN_UP: `${NAV.AUTH}/SIGN_UP`,
  AUTH_SUCCESSFUL: `${NAV.AUTH}/AUTH_SUCCESSFUL`,
  ACCOUNT_SELECT: `${NAV.AUTH}/ACCOUNT_SELECT`,
  ACTIVATE_ACC: `${NAV.AUTH}/ACTIVATE_ACC`,
  HOME: `${NAV.MAIN}/HOME`,
  SUB_MENU: `${NAV.MAIN}/SUB_MENU`,
  PAGE: `${NAV.MAIN}/PAGE`,
  KEY: `${NAV.MAIN}/KEY`,
  TRANSACTIONS: `${NAV.MAIN}/TRANSACTIONS`,
  LANDING: `LANDING`,
  NOTIFICATIONS: `${NAV.MAIN}/NOTIFICATIONS`,
};

export const ModalTypes = {
  PASSWORD: 'PASSWORD_MODAL',
  CONTRACT: 'CONTRACT_MODAL',
  NOTIFICATIONS_PAGE: 'NOTIFICATIONS_PAGE_MODAL',
  ROLE_SELECT: 'ROLE_SELECT_MODAL',
  SELECT_AUTH_TYPE: 'SELECT_AUTH_TYPE_MODAL',
  BACKUP_ACCOUNT: 'BACKUP_ACCOUNT_MODAL',
};

export const ERRORS = {
  TOKEN_EXPIRED: 'E_TOKENEXPIRED',
};

export const STATIC_PAGES = ['@invite'];
export const INTERACTIONS: Array<TReaction> = ['show', 'hide'];
