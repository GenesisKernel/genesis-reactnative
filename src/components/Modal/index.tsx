import * as React from 'react';
import { View } from 'react-native';
import { ModalTypes } from '../../constants';

import NestedContractSigningForm from 'components/NestedContractSigningModal';
import ValidatePasswordForm from 'components/ValidatePasswordForm';
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

const modalAnimationTime = 300;

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
        }, modalAnimationTime);
      } else {
        this.setState({ modal: nextProps.modal });
      }
    }
  }

  public render() {
    const { onClose, modal } = this.props;
    const isNotificationModal = modal && modal.type && modal.type === ModalTypes.NOTIFICATIONS_PAGE;

    return (
      <Modal
        style={styles.container}
        backdropOpacity={isNotificationModal ? 0 : 0.45}
        onBackdropPress={isNotificationModal ? onClose : () => null}
        onBackButtonPress={onClose}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationInTiming={modalAnimationTime}
        animationOutTiming={modalAnimationTime}
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
          return <NotificationsPage {...modal.params} onConfirm={onConfirm} onClose={onClose}/>
        default:
          return <View />;
      }
    } else {
      return <View />;
    }
  }
}