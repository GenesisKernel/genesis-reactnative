import { connect } from 'react-redux';

import * as application from 'modules/application';
import Button from 'components/ui/Button';

const mapStateToProps = state => {
  return {
    loading: application.selectors.hasPendingRequest(state)
  };
};

export default connect(mapStateToProps)(Button);
