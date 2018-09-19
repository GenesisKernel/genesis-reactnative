import * as React from 'react';
import { View } from 'react-native';
import { ModalTypes, MODAL_ANIMATION_TIME } from '../../constants';
import { path } from 'ramda';

import NestedContractSigningForm from 'components/NestedContractSigningModal';
import ValidatePasswordForm from 'components/ValidatePasswordForm';
import RoleSelectForm from 'components/RoleSelectForm';
import NotificationsPage from 'components/NotificationsPage';
import SelectAuthTypeModal from 'components/SelectAuthTypeModal';
import BackupAccountModal from 'components/BackupAccountModal';

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
  onCreateAccountPress: () => void;
  onKnownAccountPress: () => void;
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
    const isNotificationModal = path(['modal', 'type'], this.props) === ModalTypes.NOTIFICATIONS_PAGE;

    return (
      <Modal
        style={styles.container}
        backdropOpacity={isNotificationModal ? 0 : 0.45}
        onBackdropPress={this.onBackdropPress}
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
    const { onConfirm, onClose, touchIdSupport, onCreateAccountPress, onKnownAccountPress } = this.props;
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
        case ModalTypes.SELECT_AUTH_TYPE:
          return <SelectAuthTypeModal onCreateAccountPress={onCreateAccountPress} onKnownAccountPress={onKnownAccountPress} />;
        case ModalTypes.BACKUP_ACCOUNT:
          return <BackupAccountModal onConfirm={onConfirm} onClose={onClose} />
        default:
          return <View />;
      }
    } else {
      return <View />;
    }
  }

  private onBackdropPress = () => {
    const modal = path(['modal', 'type'], this.props);
    if (modal === ModalTypes.NOTIFICATIONS_PAGE || ModalTypes.ROLE_SELECT || ModalTypes.SELECT_AUTH_TYPE) {
      this.props.onClose();
    } else {
      () => null;
    }
  }
}