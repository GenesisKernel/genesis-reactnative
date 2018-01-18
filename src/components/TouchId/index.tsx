import * as React from 'react';
import { Icon } from 'react-native-elements';

import TouchID from 'react-native-touch-id';

import styles from './styles';

interface ITouchIdProps {
  touchIdSupport?: Boolean,
  iconStyle?: Object,
}

class TouchId extends React.Component<ITouchIdProps> {

  render() {
    return (
      <Icon
        type="material-icons"
        name="fingerprint"
        size={66}
        {...this.props.iconStyle}
        onPress={this.handlePrint}
      />
    );
  }

  private handlePrint = (): void => {
    console.log('there will be saga... probably');
    TouchID.authenticate().then((r: Object) => {
      console.log(r, 'success');
    }).catch((err: Object) => {
      console.log(err, 'erro')
    })
  }
}

export default TouchId;