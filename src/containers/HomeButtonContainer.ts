
import { connect } from 'react-redux';
import { navigateWithReset as reset } from 'modules/navigator/actions';
import HomeButton from 'components/HomeButton';
import { navTypes } from '../constants';

const mapDispatchToProps = (dispatch: any) => ({
  navigateWithReset: () =>  dispatch(reset([{ routeName: navTypes.HOME }])),
});

export default connect(null, mapDispatchToProps)(HomeButton);
