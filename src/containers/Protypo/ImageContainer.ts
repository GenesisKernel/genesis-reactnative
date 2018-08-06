import { connect } from 'react-redux';
import * as nodesSelectors from 'modules/nodes/selectors';
import Image from 'components/Protypo/Image';

const mapStateToProps = (state: any) => {
  return {
    currentNode: nodesSelectors.getCurrentNode(state),
  };
}

export default connect(mapStateToProps)(Image);
