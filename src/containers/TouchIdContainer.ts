import { connect } from 'react-redux';
import TouchId from '../components/TouchId';

const mapStateToProps = (state: any) => {
  return {
    touchIdSupport: state.application.touchIdSupport,
  };
};


export default connect(mapStateToProps)(TouchId);
