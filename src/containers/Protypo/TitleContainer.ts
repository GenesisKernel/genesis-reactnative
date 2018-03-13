import { connect } from 'react-redux';
import Title from 'components/Protypo/Title';

import * as application from 'modules/application';

const mapStateToProps = (state: any) => ({
  isModalActive: !!state.application.modalType,
});

const mapDispatchToProps = dispatch => ({
  receiveTitle: (title: string) =>
    dispatch(application.actions.receiveTitle(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(Title);
