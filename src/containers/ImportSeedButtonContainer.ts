import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { importSeed } from '../modules/application/actions';

const mapStateToProps = () => {
  return {
    size: 36,
    name: 'file-upload',
    color: '#6B9AE6'
  };
};

const mapDispatchToProps = (dispatch) => ({
  onPress: () => dispatch(importSeed())
});

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
