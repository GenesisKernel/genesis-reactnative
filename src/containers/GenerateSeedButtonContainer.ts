import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { generateSeed } from '../modules/application/actions';

const mapStateToProps = () => {
  return {
    size: 36,
    name: 'refresh',
    color: '#6B9AE6',
    underlayColor: 'transparent'
  };
};

const mapDispatchToProps = dispatch => ({
  onPress: () => dispatch(generateSeed())
});

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
