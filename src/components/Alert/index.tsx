import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

import Button from 'components/ui/Button';
import styles from './styles';

interface IAlertProps {
  type?: string;
  title?: string;
  message?: string;

  confirm(): void;
  cancel(): void;
}

class Alert extends React.PureComponent<IAlertProps> {
  private alert: any;

  public render() {
    return <View />;
  }

  public componentWillReceiveProps(nextProps: IAlertProps) {
    if (nextProps.message) {
      this.showWindow(nextProps);
    }
  }

  public componentWillUnmount() {
    if (this.alert && this.alert.destroy) {
      this.alert.destroy();
    }
  }

  private closeWindow = () => {
    if (this.alert) {
      this.alert.destroy();
    }
  }

  private handleConfirmButton = () => {
    this.props.confirm();
    this.closeWindow();
  }

  private handleCancelButton = () => {
    this.props.cancel();
    this.closeWindow();
  }

  private showWindow = (props: IAlertProps) => {
    const actions = [
      <Button
        key="cancel"
        title="Cancel"
        containerViewStyle={styles.dialogButtonStyle}
        buttonStyle={styles.dialogCancelButtonStyle}
        onPress={this.handleCancelButton}
      />
    ];

    if (props.type !== 'error') {
      actions.push(
        <Button
          key="confirm"
          title="Confirm"
          containerViewStyle={styles.dialogButtonStyle}
          buttonStyle={styles.dialogConfirmButtonStyle}
          onPress={this.handleConfirmButton}
        />
      );
    }

    const title = (
      <DialogTitle title={props.title} titleTextStyle={styles.dialogTitle} />
    );

    this.alert = new RootSiblings(
      (
        <PopupDialog
          show
          dialogStyle={styles.dialog}
          dialogTitle={props.title && title}
          onDismissed={this.handleCancelButton}
          width={0.8}
          height={0.4}
        >
          <View style={styles.dialogContent}>
            <Text>{props.message}</Text>

            <View style={styles.dialogActions}>{actions}</View>
          </View>
        </PopupDialog>
      )
    );
  }
}

export default Alert;
