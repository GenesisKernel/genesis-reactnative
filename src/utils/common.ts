import TouchID from 'react-native-touch-id';
import { navTypes } from '../navigatorConfig';
import { Platform } from 'react-native';

export async function checkTouchIDAvailiability(): Promise<{}> {
  let isSupported: Boolean = false;
  if (Platform.OS === 'android' && Platform.Version < 23) {
    isSupported = false;
  } else {
    try {
      const check = await TouchID.isSupported();
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