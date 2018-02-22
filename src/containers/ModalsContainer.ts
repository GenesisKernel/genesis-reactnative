import { connect } from 'react-redux';
import { path } from 'ramda';
import * as applicationActions from 'modules/application/actions';
import * as applicationSelectors from 'modules/application/selectors';

import Modal from 'components/Modal';

const mapStateToProps = (state: any) => {
  return {
    modal: state.application.modalType || null,
    touchIdSupport: applicationSelectors.getTouchIdStatus(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClose: () => dispatch(applicationActions.closeModal()),
    onConfirm: (payload: any) => dispatch(applicationActions.confirmModal(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);