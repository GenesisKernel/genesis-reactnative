import { isEmpty } from 'ramda';
import { connect } from 'react-redux';

import RevertHistroyButton from 'components/RevertHistroyButton';
import * as application from 'modules/application';

const mapStateToProps = (state) => {
  const history = application.selectors.getHistory(state);

  return {
    visible: history.length >= 2
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPress: () => dispatch(application.actions.menuBackAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(RevertHistroyButton);
