import { connect, Dispatch } from 'react-redux';
import { getNotificationsCount } from 'modules/notifications/selectors';

import NotificationsIcon from 'components/NotificationsIcon';
import * as navigator from 'modules/navigator';
import * as page from 'modules/page';
import { navTypes } from '../constants';

const mapStateToProps = (state: any) => {
  return {
    count: getNotificationsCount(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  navigateToNotifications: () => {
    dispatch(page.actions.requestPage.started({ name: 'notifications' }));
    dispatch(navigator.actions.navigate(navTypes.NOTIFICATIONS));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIcon);
