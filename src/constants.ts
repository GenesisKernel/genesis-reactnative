import { Platform } from 'react-native';

export const URL_PREFIX = Platform.OS === 'android' ? 'apla://apla/' : 'apla://';

export const DEFAULT_PAGE = 'default_page';
export const DEFAULT_TITLE = 'Home';
