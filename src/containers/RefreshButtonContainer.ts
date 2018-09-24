import { connect } from 'react-redux';
import { actions } from 'modules/page';
import RefreshButton from 'components/RefreshButton';

const mapStateToProps = (state: any) => ({
  historyItems: state.application.history,
  currentItem: state.application.currentPageId,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestPageStarted: (pagePayload: actions.IPagePayload) => {
    dispatch(actions.requestPage.started(pagePayload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RefreshButton);
