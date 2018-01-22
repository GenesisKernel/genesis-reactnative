import TouchID from 'react-native-touch-id';
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