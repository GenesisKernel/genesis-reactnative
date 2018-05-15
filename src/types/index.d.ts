declare module 'uuid';
declare module 'Buffer';
declare module 'jsrsasign';

declare module 'react-native-camera';
declare module 'react-native-code-push';
declare module 'react-native-datepicker';
declare module 'react-native-popup-dialog';
declare module 'react-native-root-siblings';
declare module 'react-native-modal-dropdown';
declare module 'react-native-modal';
declare module 'react-native-status-bar-height';
declare module 'react-native-swipeable-row';
declare module 'react-native-fingerprint-scanner';
declare module 'react-native-haptic';
declare module 'appcenter';
declare module 'appcenter-push';
declare module 'react-native-mail';
declare module 'react-native-email';
declare module 'redux-persist';
declare module 'redux-persist/es/storage';
declare module 'redux-persist/lib/constants';

declare type IRole = {
  role_name: string;
  role_id: number;
} | undefined;

declare type INode = {
  apiUrl: string;
  msgUrl?: string;
}

declare type INotificationData = {
  role_id: number;
  ecosystem: number;
  count: number;
}

declare type IAccount = {
  uniqKey: string;
  avatar: string;
  username: string;
  ecosystem_id: string;
  key_id: string;
  address: string;
  roles: string[];
  encKey: string;
  publicKey: string;
}

declare module 'react-native-stylable' {
  export type Rule = {
    style: { [key: string]: any };
    props?: { [key: string]: any };
    mixins?: string[];
  };

  export type Rules = {
    [key: string]: Rule;
  };

  export class Stylesheet {
    addRules(rules: Rules): void;
    addDefaultRules(rules: Rules): void;
  }

  type Stylable = {
    (component: any): any;
  };

  export function stylable(name: string): Stylable;
}

declare type HashMap = { [key: string]: any };
