import { connect } from 'react-redux';
import Scanner from 'components/Scanner';
import { receiveQRCode } from '../modules/application/actions';
import { back } from 'modules/navigator/actions';

const mapDispatchToProps = (dispatch) => ({
  onScan: (data: string) => dispatch(receiveQRCode(data)),
  goBack: () => dispatch(back()),
});

export default connect(undefined, mapDispatchToProps)(Scanner);
