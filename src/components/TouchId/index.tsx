import * as React from 'react';
import { Icon } from 'react-native-elements';
import { Platform, Vibration, View, TouchableOpacity } from 'react-native';

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
    intl: {
      id: string;
      defaultMessage: string;
    },
    key: number;
  };
}

class TouchId extends React.Component<ITouchIdProps, ITouchState> {
  state = {
    dialogActivated: false,
    androidAlertFingerprintDescr: {
      intl: {
        id: "fingerprint.scan.to.continue",
        defaultMessage: 'Use your touch or face id scanner.',
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
                intl={{ id: "fingerprint.authentication", defaultMessage: 'Biometric authentication' }}/>
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
      Vibration.vibrate(3, false);
      onSuccess && onSuccess();
    }).catch((err: any) => {
      onFail && onFail();
    });
  }

  private androidFingerprintRequest = (): void => {
    const { onSuccess, onFail, reason } = this.props;
    const request = FingerprintScanner.authenticate({ onAttempt: this.androidFingerprintOnAttempt });
    this.setState({ dialogActivated: true });

    request.then((r: any) => {
      Vibration.vibrate(3, false)
      onSuccess && onSuccess();
    }).catch((err: any) => {
      Vibration.vibrate([0, 3, 0, 3, 0, 3], false);
      onFail && onFail('withError');
    });
  }

  private androidFingerprintOnAttempt = (err: { message: string }): void => {
    this.setState({ androidAlertFingerprintDescr: {
        ...this.state.androidAlertFingerprintDescr,
        intl: {
          id: 'fingerprint.no.match',
          defaultMessage: 'No match.'
        },
        key: this.state.androidAlertFingerprintDescr.key + 1
      }
    });
  }
}

export default TouchId;