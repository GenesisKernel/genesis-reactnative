import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { FormattedMessage } from 'react-intl';
import Camera from 'react-native-camera';
import Text from '../ui/Text';
import Button from '../ui/Button';

import ScannerFrame from './ScannerFrame';
import styles from './styles';

export interface ISignUpProps {
  onScan(data: string): void;
  goBack(): void;
}

const cancelTitle = {
  id: 'auth.type.cancel',
  defaultMessage: "CANCEL",
};

class Scanner extends React.Component<ISignUpProps, object> {
  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            aspect={Camera.constants.Aspect.fill}
            onBarCodeRead={this.handleBarCodeRead}
            barCodeTypes={[Camera.constants.BarCodeType.qr]}>
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
          </Camera>
        </View>
      </View>
    );
  }

  private handleBarCodeRead = (payload: object) => {
    this.props.onScan(payload.data);
  }

  private handleCancelButton = () => {
    this.props.goBack();
  }
}

export default Scanner;
