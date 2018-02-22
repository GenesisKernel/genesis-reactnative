import * as React from 'react';
import { Icon } from 'react-native-elements';
import { Alert } from 'react-native';

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
    TouchID.authenticate(reason).then((r: Object) => {
      onSuccess && onSuccess();
    }).catch((err: Object) => {
      onFail && onFail();
    })
  }
}

export default TouchId;