import { connect } from 'react-redux';
import { getNotificationsCount } from 'modules/notifications/selectors';

import Notifications from 'components/Notifications';

const mapStateToProps = (state: any) => {
  return {
    count: getNotificationsCount(state),
  };
};

export default connect(mapStateToProps)(Notifications);
