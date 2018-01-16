import { connect } from 'react-redux';
import Scanner from 'components/Scanner';
import { receiveQRCode } from '../modules/application/actions';

const mapDispatchToProps = (dispatch) => ({
  onScan: (data: string) => dispatch(receiveQRCode(data))
});

export default connect(undefined, mapDispatchToProps)(Scanner);
