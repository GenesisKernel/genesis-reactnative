import { connect } from 'react-redux';
import * as applicationActions from 'modules/application/actions';
import * as transactionActions from 'modules/transaction/actions';
import NestedContractSigningModal from 'components/NestedContractSigningModal';

export interface IState {
  application: {
    nestedContractModalData: null | {}
  };
  auth: {
    privateKey: string;
    privateKeyValid: boolean;
  };
}

const mapStateToProps = (state: IState) => {
  return {
    nestedContractModalData: state.application.nestedContractModalData,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onConfirm: () => dispatch(applicationActions.confirmNestedContractSignin()),
    onCancel: () => dispatch(transactionActions.rejectNestedContract())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NestedContractSigningModal);