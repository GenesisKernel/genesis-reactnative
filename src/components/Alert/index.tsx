import * as React from 'react';
import { View } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { getTranslations } from 'utils/translations';

import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import styles from './styles';

interface IAlertProps {
  type?: string;
  title?: string;
  message: string;
  currentLocale: string;

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
    const locale = this.props.currentLocale.substr(0, 2) || 'en';
    const translations = getTranslations(this.props.currentLocale);

    const actions = [
      <Button
        key="cancel"
        title={translations["singup.button.cancel"]}
        containerViewStyle={styles.dialogButtonStyle}
        buttonStyle={styles.dialogCancelButtonStyle}
        onPress={this.handleCancelButton}
      />
    ];

    if (props.type !== 'error') {
      actions.push(
        <Button
          key="confirm"
          title={translations["modal.window.confirm"]}
          containerViewStyle={styles.dialogButtonStyle}
          buttonStyle={styles.dialogConfirmButtonStyle}
          onPress={this.handleConfirmButton}
        />
      );
    }

    const title = (
      <DialogTitle
        title={props.title && translations[props.title] ? translations[props.title] : props.title}
        titleTextStyle={styles.dialogTitle} />
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
            <Text>{translations[props.message] || props.message}</Text>
            <View style={styles.dialogActions}>{actions}</View>
          </View>
        </PopupDialog>
      )
    );
  }
}

export default Alert;
