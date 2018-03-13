import * as React from 'react';
import { View } from 'react-native';
import { ModalTypes } from '../../constants';

import NestedContractSigningForm from 'components/NestedContractSigningModal';
import ValidatePasswordForm from 'components/ValidatePasswordForm';
import NotificationsPage from 'components/NotificationsPage';
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

export default class CommonModal extends React.Component<IModalProps, {}> {

  public render() {
    const { modal, onClose } = this.props;
    const isNotificationModal = modal && modal.type && modal.type === ModalTypes.NOTIFICATIONS_PAGE;

    return (
      <Modal
        style={styles.container}
        backdropOpacity={isNotificationModal ? 0 : 0.45}
        onBackdropPress={isNotificationModal ? onClose : () => null}
        onBackButtonPress={onClose}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
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
          return <ValidatePasswordForm  {...modal.params} onConfirm={onConfirm} onClose={onClose}/>;
        case ModalTypes.NOTIFICATIONS_PAGE:
          return <NotificationsPage {...modal.params} onConfirm={onConfirm} onClose={onClose}/>
        default:
          return null;
      }
    } else {
      return null;
    }
  }
}