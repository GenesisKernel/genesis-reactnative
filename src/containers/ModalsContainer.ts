import { connect } from 'react-redux';
import { path } from 'ramda';
import { InteractionManager } from 'react-native';

import * as application from 'modules/application';
import * as navigator from 'modules/navigator';

import { navTypes, MODAL_ANIMATION_TIME } from '../constants';
import Modal from 'components/Modal';

const mapStateToProps = (state: any) => {
  return {
    modal: state.application.modalType || null,
    touchIdSupport: application.selectors.getTouchIdStatus(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: (payload: 'withError' | undefined) => {
      if (payload === 'withError') {
        dispatch(application.actions.receiveAlert({ title: 'Touch ID error', type: 'error', message: 'Athentication failed, try again after few minutes.' }));
      };
      dispatch(application.actions.closeModal());
    },
    onConfirm: (payload: any) => {
      dispatch(application.actions.confirmModal(payload));
    },
    onCreateAccountPress: () => {
      dispatch(application.actions.closeModal());
      dispatch(application.actions.toggleDrawer(false));
      InteractionManager.runAfterInteractions(() => {
        dispatch(navigator.actions.navigate(navTypes.SIGN_UP_WARNING));
      });
    },
    onKnownAccountPress: () => {
      dispatch(application.actions.closeModal());
      dispatch(application.actions.toggleDrawer(false));
      InteractionManager.runAfterInteractions(() => {
        dispatch(navigator.actions.navigate(navTypes.AUTH));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);