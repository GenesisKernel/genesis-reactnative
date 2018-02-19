import * as React from 'react';
import { View, Text } from 'react-native';

import Modal from "react-native-modal";
import Button from 'components/ui/Button';

import styles from './styles';

export interface INestedContractSigningModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default class NestedContractSigningForm extends React.Component<INestedContractSigningModalProps, {}> {
  public render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          onPress={this.props.onConfirm}
          title="ok" />
        <Button
          onPress={this.props.onClose}
          title="ne ok" />
      </View>
    );
  }
}
