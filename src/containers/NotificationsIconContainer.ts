import { connect, Dispatch } from 'react-redux';
import { getNotificationsCount } from 'modules/notifications/selectors';

import NotificationsIcon from 'components/NotificationsIcon';
import * as navigator from 'modules/navigator';
import * as page from 'modules/page';
import * as application from 'modules/application';
import { navTypes, ModalTypes } from '../constants';

const mapStateToProps = (state: any) => {
  return {
    count: getNotificationsCount(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  showNotificationsPage: () => {
    dispatch(page.actions.requestPageWithoutRendering({ name: 'notifications_testpage', dontRender: true }));
    dispatch(application.actions.showModal({ type: ModalTypes.NOTIFICATIONS_PAGE }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIcon);
