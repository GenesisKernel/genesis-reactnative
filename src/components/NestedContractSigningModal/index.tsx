import * as React from 'react';
import { View, Text } from 'react-native';

import Button from 'components/ui/Button';
import Modal from "react-native-modal";

import styles from './styles';

export interface INestedContractSigningModalProps {
  nestedContractModalData: null | {};
  onConfirm: () => void;
  onCancel: () => void;
}

export default class NestedContractSigningModal extends React.Component<INestedContractSigningModalProps, {}> {
  public render() {
    const { nestedContractModalData } = this.props;
    return (
      <Modal isVisible={!!nestedContractModalData}>
        <View style={{ flex: 1 }}>
          <Button
            onPress={this.props.onConfirm}
            title="ok"/>
          <Button
            onPress={this.props.onCancel}
            title="ne ok"/>
        </View>
      </Modal>
    );
  }
}
