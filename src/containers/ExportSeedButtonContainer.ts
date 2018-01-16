import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { exportSeed } from '../modules/auth/actions';

const mapStateToProps = () => {
  return {
    size: 36,
    name: 'file-download',
    color: '#6B9AE6'
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onPress: () => dispatch(exportSeed())
});

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
