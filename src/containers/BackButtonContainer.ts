import { connect } from 'react-redux';
import BackButton from 'components/BackButton';
import { actions } from 'modules/page';
import { navigateWithReset } from 'modules/navigator/actions';
import { navTypes } from '../constants';

const mapStateToProps = (state: any) => ({
  historyItems: state.application.history,
});

const mapDispatchToProps = (dispatch: any) => ({
  requestPageStarted: (pagePayload: actions.IPagePayload) => {
    dispatch(actions.requestPage.started(pagePayload));
  },
  navigateWithReset: () =>  dispatch(navigateWithReset([{ routeName: navTypes.HOME }])),
});

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
