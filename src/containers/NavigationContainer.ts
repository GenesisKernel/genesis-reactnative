
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import Navigator from '../navigatorConfig';

const mapStateToProps = ({ navigation }) => ({ navigation });
const mergeProps = (stateProps, dispatchProps) => Object.assign(
  {
    navigation: addNavigationHelpers({
      dispatch: dispatchProps.dispatch,
      state: stateProps.navigation
    })
  }
);

export default connect(mapStateToProps, null, mergeProps)(Navigator);
