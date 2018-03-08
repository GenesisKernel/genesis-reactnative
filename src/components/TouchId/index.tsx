import * as React from 'react';
import { Icon } from 'react-native-elements';
import { Alert, Platform, Vibration } from 'react-native';

import ReactNativeHaptic from 'react-native-haptic';
import TouchID from 'react-native-touch-id';

import styles from './styles';

interface ITouchIdProps {
  touchIdSupport?: Boolean;
  iconStyle?: Object;
  onSuccess?: () => void;
  onFail?: () => void;
  reason?: string;
  CustomButton?: any;
}

class TouchId extends React.Component<ITouchIdProps> {

  render() {
    const { CustomButton } = this.props;

    return (
      CustomButton
        ?(
          CustomButton(this.handlePrint)
        ) :(
          <Icon
            type="material-icons"
            name="fingerprint"
            size={66}
            {...this.props.iconStyle}
            onPress={this.handlePrint}
          />
        )
    );
  }

  private handlePrint = (): void => {
    const { onSuccess, onFail, reason } = this.props;
    console.log(ReactNativeHaptic, 'ReactNativeHaptic')
    TouchID.authenticate(reason).then((r: Object) => {
      if (Platform.OS === 'android') {
        Vibration.vibrate([0, 200, 20, 500], false);
      } else {
        // ReactNativeHaptic.generate('impact');
      }
      onSuccess && onSuccess();
    }).catch((err: Object) => {
      if (Platform.OS === 'android') {
        Vibration.vibrate(200, false);
      } else {
        // ReactNativeHaptic.generate('notification');
      }
      onFail && onFail();
    });
  }
}

export default TouchId;