import { connect } from 'react-redux';
import Transactions from 'components/Transactions';

import * as transaction from 'modules/transaction';

const mapStateToProps = (state: any) => {

  return {
    items: Object.values(transaction.selectors.getTransactions(state))
  };
};

export default connect(mapStateToProps)(Transactions);
