import * as React from 'react';
import { View } from 'react-native';
import { ModalTypes, MODAL_ANIMATION_TIME } from '../../constants';

import NestedContractSigningForm from 'components/NestedContractSigningModal';
import ValidatePasswordForm from 'components/ValidatePasswordForm';
import RoleSelectForm from 'components/RoleSelectForm';
import NotificationsPage from 'components/NotificationsPage';
import Modal from "react-native-modal";
import styles from './styles';

interface IModal {
  modal: {
    type: string;
    params?: any;
  } | null;
}

export interface IModalProps extends IModal {
  touchIdSupport: boolean;
  onConfirm: () => void;
  onClose: (payload?: 'withError' | undefined) => void;
}

export default class CommonModal extends React.PureComponent<IModalProps, IModal> {
  constructor(props: IModalProps) {
    super(props);
    this.state = {
      modal: props.modal,
    }
  }

  componentWillReceiveProps(nextProps: IModalProps) {
    if (this.state.modal !== nextProps.modal) {
      if (nextProps.modal === null) {
        setTimeout(() => {
          this.setState({ modal: nextProps.modal });
        }, MODAL_ANIMATION_TIME);
      } else {
        this.setState({ modal: nextProps.modal });
      }
    }
  }

  public render() {
    const { onClose, modal } = this.props;
    const isNotificationModal = modal && modal.type && modal.type === ModalTypes.NOTIFICATIONS_PAGE;
    const isRoleSelectModal = modal && modal.type && modal.type === ModalTypes.ROLE_SELECT; // TODO: find better solution

    return (
      <Modal
        style={styles.container}
        backdropOpacity={isNotificationModal ? 0 : 0.45}
        onBackdropPress={isNotificationModal || isRoleSelectModal ? onClose : () => null}
        onBackButtonPress={onClose}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationInTiming={MODAL_ANIMATION_TIME}
        animationOutTiming={MODAL_ANIMATION_TIME}
        isVisible={!!modal}>
        {this.selectModalToRender()}
      </Modal>
    );
  }

  private selectModalToRender = (): any => {
    const { onConfirm, onClose, touchIdSupport } = this.props;
    const { modal } = this.state;

    if (modal && modal.type) {
      switch(modal.type) {
        case ModalTypes.CONTRACT:
          return <NestedContractSigningForm touchIdSupport={touchIdSupport} params={...modal.params} onConfirm={onConfirm} onClose={onClose} />;
        case ModalTypes.PASSWORD:
          return <ValidatePasswordForm  {...modal.params} onConfirm={onConfirm} onClose={onClose}/>;
        case ModalTypes.NOTIFICATIONS_PAGE:
          return <NotificationsPage {...modal.params} onConfirm={onConfirm} onClose={onClose}/>;
        case ModalTypes.ROLE_SELECT:
          return <RoleSelectForm {...modal.params} onConfirm={onConfirm} onClose={onClose} />;
        default:
          return <View />;
      }
    } else {
      return <View />;
    }
  }
}