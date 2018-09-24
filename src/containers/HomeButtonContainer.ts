
import { connect } from 'react-redux';
import { navigateWithReset } from 'modules/navigator/actions';
import HomeButton from 'components/HomeButton';
import { navTypes } from '../constants';

const mapDispatchToProps = (dispatch: any) => ({
  navigateWithReset: () =>  dispatch(navigateWithReset([{ routeName: navTypes.HOME }])),
});

export default connect(null, mapDispatchToProps)(HomeButton);
