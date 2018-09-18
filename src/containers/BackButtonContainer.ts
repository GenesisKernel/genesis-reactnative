import { connect } from 'react-redux';
import BackButton from 'components/BackButton'
import { actions } from 'modules/page';

const mapStateToProps = (state: any, ownProps: any) => ({
  historyItems: state.application.history,
  ...ownProps,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestPageStarted: (pagePayload: actions.IPagePayload) => {
    dispatch(actions.requestPage.started(pagePayload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);