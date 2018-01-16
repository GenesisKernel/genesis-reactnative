import * as React from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose, isEmpty } from 'ramda';
import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import PopupDialog, {
  DialogTitle,
  DialogButton
} from 'react-native-popup-dialog';
import { stylable } from 'react-native-stylable';

import ButtonDefault from 'components/ui/Button';
import InputHidden from 'components/ui/InputHidden';
import defaultStyles from './Button.style';

export interface IAlert {
  icon: string;
  text: string;
  confirmbutton: string;
  cancelbutton: string;
}

export interface IButtonProps extends IElementProps {
  componentKey: string;
  loading?: boolean;
  attr: {
    alert?: IAlert;
    page?: string;
    contract?: string;
    params?: { [key: string]: string };
    pageparams?: { [key: string]: string };
  };

  submit(params: any, meta?: any): void;
}

class Button extends React.PureComponent<IButtonProps> {
  private alert: any;

  public render() {
    const { style, children, loading } = this.props;

    let loadingElement;

    if (loading) {
      loadingElement = (
        <ActivityIndicator
          animating
          style={defaultStyles.activityIndicatorStyle}
          color="white"
          size="small"
        />
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[defaultStyles.button, style]}
        onPress={this.handleSubmit}
      >
        {loading ? loadingElement : children}
      </TouchableOpacity>
    );
  }

  public componentWillUnmount() {
    if (this.alert && this.alert.destroy) {
      this.alert.destroy();
    }
  }

  private submit = () => {
    const {
      attr: { page, pageparams, contract, params },
      componentKey
    } = this.props;

    this.props.submit(
      {
        page,
        pageparams,
        contract,
        params
      },
      {
        initiator: componentKey
      }
    );
  }

  private closeAlert = () => {
    if (this.alert) {
      this.alert.destroy();
    }
  }

  private handleConfirmButton = () => {
    this.closeAlert();
    this.submit();
  }

  private handleCancelButton = () => {
    this.closeAlert();
  }

  private showAlert = (alert: IAlert) => {
    const title = (
      <DialogTitle title="Alert" titleTextStyle={defaultStyles.dialogTitle} />
    );
    const actions = (
      <View style={defaultStyles.dialogActions}>
        <ButtonDefault
          title={alert.cancelbutton}
          containerViewStyle={defaultStyles.dialogButtonStyle}
          buttonStyle={defaultStyles.dialogCancelButtonStyle}
          onPress={this.handleCancelButton}
        />
        <ButtonDefault
          title={alert.confirmbutton}
          containerViewStyle={defaultStyles.dialogButtonStyle}
          buttonStyle={defaultStyles.dialogConfirmButtonStyle}
          onPress={this.handleConfirmButton}
        />
      </View>
    );

    this.alert = new RootSiblings(
      (
        <PopupDialog
          show
          dialogTitle={title}
          onDismissed={this.closeAlert}
          dialogStyle={defaultStyles.dialog}
          width="80%"
          height="60%"
        >
          <View style={defaultStyles.dialogContent}>
            <Text>{alert.text}</Text>
            {actions}
          </View>
        </PopupDialog>
      )
    );
  }

  private handleSubmit = () => {
    Keyboard.dismiss();

    const { alert } = this.props.attr;

    if (alert) {
      this.showAlert(alert);
    } else {
      this.submit();
    }
  }
}

export default stylable('Button')(Button);
