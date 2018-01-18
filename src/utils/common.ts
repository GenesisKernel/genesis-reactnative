import TouchID from 'react-native-touch-id';

export async function checkTouchIDAvailiability(): Promise<{}> {
  let isSupported: Boolean = false;
  try {
    const kek = await TouchID.isSupported();
    isSupported = true;
  } catch (err) {
    isSupported = false
  }
  return isSupported;
}