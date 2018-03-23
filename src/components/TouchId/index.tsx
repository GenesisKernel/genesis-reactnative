import * as React from 'react';
import { Icon } from 'react-native-elements';
import { Platform, Vibration, View, TouchableOpacity } from 'react-native';

import ReactNativeHaptic from 'react-native-haptic';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';

import Text from 'components/ui/Text';
import styles from './styles';

interface ITouchIdProps {
  touchIdSupport?: Boolean;
  iconStyle?: Object;
  onSuccess?: () => void;
  onFail?: (payload?: 'withError' | undefined) => void;
  reason?: string;
  CustomButton?: any;
}

interface ITouchState {
  dialogActivated: boolean;
  androidAlertFingerprintDescr: {
    message: string;
    key: number;
  };
}

class TouchId extends React.Component<ITouchIdProps, ITouchState> {
  state = {
    dialogActivated: false,
    androidAlertFingerprintDescr: {
      intl: {
        id: "fingerprint.scan.to.continue",
        defaultMessage: 'Scan your fingerprint on the device scanner to continue',
      },
      key: 112,
    },
  }

  public componentWillUnmount() {
    FingerprintScanner.release();
  }

  render() {
    const { CustomButton } = this.props;
    const { dialogActivated, androidAlertFingerprintDescr } = this.state;
    const fingerprintRequestType = Platform.OS === 'android' ? this.androidFingerprintRequest : this.iosFingerprintRequest;

    return (
      <View>
        <Modal
          isVisible={dialogActivated}>
          <View style={styles.modalContainer}>
            <View style={styles.alertForm}>
              <Text
                style={styles.title}
                intl={{ id: "fingerprint.authentication", defaultMessage: 'Fingerprint Authentication' }}/>
              <View style={styles.iconDescrContainer}>
                <Icon
                  type="material-icons"
                  name="fingerprint"
                  size={52}
                  iconStyle={styles.androidAlertFingerprintIcon}
                />
                <Animatable.View
                  animation="shake"
                  duration={400}
                  easing="ease-in-out"
                  direction="alternate"
                  iterationCount={1}
                  key={androidAlertFingerprintDescr.key}
                  style={styles.descrContainer}>
                  <Text style={styles.descr} intl={androidAlertFingerprintDescr.intl}/>
                </Animatable.View>
              </View>
              <TouchableOpacity
                onPress={this.cancelFingerprintRequest}
                style={styles.cancelAuthContainer}>
                <Text
                  style={styles.cancelAuthText}
                  intl={{ id: "fingerprint.android.cancel", defaultMessage: 'CANCEL' }} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {
          CustomButton
            ? (
              CustomButton(fingerprintRequestType)
            ) : (
              <Icon
                type="material-icons"
                name="fingerprint"
                size={66}
                {...this.props.iconStyle}
                onPress={fingerprintRequestType}
              />
            )
        }
      </View>
    );
  }

  private cancelFingerprintRequest = (): void => {
    this.setState({ dialogActivated: false }, () => {
      FingerprintScanner.release();
    });
  }

  private iosFingerprintRequest = (): void => {
    const { onSuccess, onFail, reason } = this.props;
    FingerprintScanner.authenticate({ description: reason, fallbackEnabled: false })
    .then((r: any) => {
      ReactNativeHaptic.generate('impact');
      onSuccess && onSuccess();
    }).catch((err: any) => {
      ReactNativeHaptic.generate('notification');
      onFail && onFail();
    });
  }

  private androidFingerprintRequest = (): void => {
    const { onSuccess, onFail, reason } = this.props;
    const request = FingerprintScanner.authenticate({ onAttempt: this.androidFingerprintOnAttempt });
    this.setState({ dialogActivated: true });

    request.then((r: any) => {
      Vibration.vibrate([0, 200, 20, 500], false);
      onSuccess && onSuccess();
    }).catch((err: any) => {
      Vibration.vibrate(200, false);
      onFail && onFail('withError');
    });
  }

  private androidFingerprintOnAttempt = (err: { message: string }): void => {
    this.setState({ androidAlertFingerprintDescr: {
        message: err.message, key: this.state.androidAlertFingerprintDescr.key + 1
      }
    });
  }
}

export default TouchId;