import * as React from 'react';
import { View } from 'react-native';

import NestedContractSigningForm from 'components/NestedContractSigningModal';
import ValidatePasswordForm from 'components/ValidatePasswordForm';
import Modal from "react-native-modal";
import styles from './styles';

export interface IModalProps {
  modal: {
    type: string;
    params?: any;
  } | null;
  touchIdSupport: boolean;
  onConfirm: () => void;
  onClose: (payload?: 'withError' | undefined) => void;
}

export const ModalTypes = {
  PASSWORD: 'PASSWORD_MODAL',
  CONTRACT: 'CONTRACT_MODAL',
}


export default class CommonModal extends React.Component<IModalProps, {}> {

  public render() {
    const { modal } = this.props;
    return (
      <Modal
        style={styles.container}
        onBackButtonPress={this.props.onClose}
        isVisible={!!modal}>
        {this.selectModalToRender() || <View></View>}
      </Modal>
    );
  }

  private selectModalToRender = (): any => {
    const { modal, onConfirm, onClose, touchIdSupport } = this.props;
    if (modal && modal.type) {
      switch(modal.type) {
        case ModalTypes.CONTRACT:
          return <NestedContractSigningForm touchIdSupport={touchIdSupport} params={...modal.params} onConfirm={onConfirm} onClose={onClose} />;
        case ModalTypes.PASSWORD:
          return <ValidatePasswordForm  {...modal.params} onConfirm={onConfirm} onClose={onClose}/>
        default:
          return null;
      }
    } else {
      return null;
    }
  }
}