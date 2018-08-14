import * as React from 'react';
import { View, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import { FormattedMessage } from 'react-intl';
import { RNCamera } from 'react-native-camera';

import Text from '../ui/Text';
import Button from '../ui/Button';

import ScannerFrame from './ScannerFrame';
import styles from './styles';

export interface ISignUpProps {
  onScan(data: string): void;
  goBack(): void;
}

const cancelTitle = {
  id: "singup.button.cancel",
  defaultMessage: "CANCEL",
};

const useExistedCodeTitle = {
  id: "auth.scanner.existed.code",
  defaultMessage: "USE EXISTED CODE",
};

const scanAgainTitle = {
  id: "auth.scanner.scan.again",
  defaultMessage: "SCAN AGAIN",
};

class Scanner extends React.Component<ISignUpProps, {qrCode: string | null}> {

  state = {
    qrCode: null,
  }

  public render() {
    const { qrCode } = this.state;

    return (
      <View style={styles.container}>
        {
          qrCode === null ? (
            <View style={styles.cameraContainer}>
              <RNCamera
                style={styles.camera}
                onBarCodeRead={this.handleBarCodeRead}
              >
                <View style={styles.qrContainer}>
                  <View style={styles.qrFrameWrapper}>
                    <ScannerFrame />
                  </View>
                  <Button
                    onPress={this.handleCancelButton}
                    buttonStyle={styles.cancelButton}
                    textStyle={styles.cancelButtonText}
                    intl={cancelTitle}
                  />
                </View>
              </RNCamera>
            </View>
          )
            : (
              <ImageBackground
                source={require('../../../assets/images/bg.png')}
                style={styles.buttonsContainer}>
                <Button
                  onPress={this.enableScanner}
                  buttonStyle={styles.scanAgainButton}
                  textStyle={styles.scanAgainButtonText}
                  intl={scanAgainTitle}
                />
                <Button
                  onPress={this.goToSignInScreen}
                  buttonStyle={styles.existedCodeButton}
                  textStyle={styles.existedCodeButtonText}
                  intl={useExistedCodeTitle}
                />
                <Button
                  onPress={this.handleCancelButton}
                  buttonStyle={styles.cancelButton}
                  textStyle={styles.cancelButtonText}
                  intl={cancelTitle}
                />
              </ImageBackground>
            )
        }
      </View>
    );
  }

  private handleBarCodeRead = (payload: object): void => {
    if (payload.data !== this.state.qrCode) {
      this.setState({ qrCode: payload.data }, () => {
        this.props.onScan(payload.data);
      });
    }
  }

  private goToSignInScreen = (): void => {
    this.props.onScan(this.state.qrCode);
  }

  private enableScanner = (): void => {
    this.setState({ qrCode: null });
  }

  private handleCancelButton = () => {
    this.props.goBack();
  }
}

export default Scanner;
