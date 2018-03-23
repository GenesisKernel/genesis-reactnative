import FingerprintScanner from 'react-native-fingerprint-scanner';
import { navTypes } from '../constants';
import { Platform, NativeModules } from 'react-native';

export async function checkTouchIDAvailiability(): Promise<{}> {
  let isSupported: Boolean = false;
  if (Platform.OS === 'android' && Platform.Version < 23) {
    isSupported = false;
  } else {
    try {
      const check = await FingerprintScanner.isSensorAvailable();
      isSupported = true;
    } catch (err) {
      isSupported = false
    }
  }
  return isSupported;
}

export const isRouteToCollapseApp = (currentRoute: string): boolean => {
  const forbiddenRoutes = [navTypes.HOME, navTypes.ACCOUNT_SELECT];
  if (forbiddenRoutes.indexOf(currentRoute) !== -1) {
    return true;
  } else {
    return false;
  }
}

export const getCurrentLocale = () => {
  let systemLanguage;
  if (Platform.OS === 'android') {
    systemLanguage = NativeModules.I18nManager.localeIdentifier.replace('_', '-');
  } else {
    systemLanguage = NativeModules.SettingsManager.settings.AppleLocale.replace('_', '-');
  }
  return systemLanguage;
}