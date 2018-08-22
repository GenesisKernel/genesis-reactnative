import { connect, Dispatch } from 'react-redux';
import { getNotificationsCount } from 'modules/notifications/selectors';

import NotificationsIcon from 'components/NotificationsIcon';
import * as navigator from 'modules/navigator';
import * as page from 'modules/page';
import * as application from 'modules/application';
import * as navigatorSelectors from 'modules/navigator/selectors';
import { navTypes, ModalTypes } from '../constants';

const mapStateToProps = (state: any) => {
  return {
    count: getNotificationsCount(state),
    isHomeRoute: navigatorSelectors.getCurrentRoute(state).routeName === navTypes.HOME,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  showNotificationsPage: (withReset = false) => {
    dispatch(page.actions.requestPage.started({ name: 'notifications'}));
    if (withReset) {
      dispatch(navigator.actions.navigateWithReset([{ routeName: navTypes.PAGE , params: {
        withGoHomeButton: true,
      }}]));
    } else {
      dispatch(navigator.actions.navigate(navTypes.PAGE));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIcon);
