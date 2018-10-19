import { connect } from 'react-redux';
import { getCurrentLocale } from 'modules/application/selectors';
import Alert from 'components/Alert';

import * as applicationSelectors from 'modules/application/selectors';
import * as applicationActions from 'modules/application/actions';

const mapStateToProps = (state: any) => {
  return {
    ...applicationSelectors.getAlert(state),
    currentLocale: applicationSelectors.getCurrentLocale(state),
  };
};

const mapDispatchToProps = dispatch => ({
  cancel: () => dispatch(applicationActions.cancelAlert()),
  confirm: () => dispatch(applicationActions.confirmAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
