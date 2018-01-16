import { connect } from 'react-redux';
import LinkPage from 'components/Protypo/LinkPage';

import * as application from 'modules/application';

const mapDispatchToProps = dispatch => ({
  submit: (params: any) =>
    dispatch(application.actions.receivePageParams(params))
});

export default connect(undefined, mapDispatchToProps)(LinkPage);
