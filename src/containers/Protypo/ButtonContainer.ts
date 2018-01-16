import { connect } from 'react-redux';
import Button, { IButtonProps } from 'components/Protypo/Button';

import * as application from 'modules/application';
import * as page from 'modules/page';
import * as transaction from 'modules/transaction';

const mapStateToProps = (state: any, ownProps: IButtonProps) => ({
  loading:
    application.selectors.hasPendingRequest(state) ||
    transaction.selectors.hasPendingTransactionByInitiator(
      ownProps.componentKey
    )(state)
});

const mapDispatchToProps = dispatch => ({
  submit: (...args: any[]) =>
    dispatch(application.actions.receivePageParams(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
