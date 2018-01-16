import { connect } from 'react-redux';
import Alert from 'components/Alert';

import * as application from 'modules/application';

const mapStateToProps = (state: any) => {
  return {
    ...application.selectors.getAlert(state)
  };
};

const mapDispatchToProps = dispatch => ({
  cancel: () => dispatch(application.actions.cancelAlert()),
  confirm: () => dispatch(application.actions.confirmAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
