import { connect, Dispatch } from 'react-redux';

import StatusIcon from 'components/StatusIcon';
import * as page from 'modules/page';
import * as navigator from 'modules/navigator';
import { navTypes } from '../constants';

const mapStateToProps = (state: any) => {
  return {
    pending: page.selectors.isFetching(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  navigateToTransactions: () =>
    dispatch(navigator.actions.navigate(navTypes.TRANSACTIONS))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusIcon);
