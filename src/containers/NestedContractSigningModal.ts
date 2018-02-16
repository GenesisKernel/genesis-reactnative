import { connect } from 'react-redux';
import * as applicationActions from 'modules/application/actions';
import * as transactionActions from 'modules/transaction/actions';
import NestedContractSigningModal from 'components/NestedContractSigningModal';

const mapStateToProps = (state: { application: { nestedContractModalData: null | {} } }) => {
  return {
    nestedContractModalData: state.application.nestedContractModalData
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onConfirm: () => dispatch(applicationActions.confirmNestedContractSignin()),
    onCancel: () => dispatch(transactionActions.rejectNestedContract())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NestedContractSigningModal);