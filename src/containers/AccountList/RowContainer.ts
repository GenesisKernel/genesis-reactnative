import { connect } from 'react-redux';
import Row from 'components/AccountList/Row';

import { receiveSelectedAccount } from 'modules/auth/actions';
import * as accountSelectors from 'modules/account/selectors';
import * as nodesSelectors from 'modules/nodes/selectors';
import * as notificationsSelectors from 'modules/notifications/selectors';
import * as authSelectors from 'modules/auth/selectors';
import * as ecosystemSelectors from 'modules/ecosystem/selectors';
import * as navigatorSelectors from 'modules/navigator/selectors';
import * as navigatorActions from 'modules/navigator/actions';

import { navTypes } from '../../constants';

interface IOwnProps {
  onDisableScroll: () => void;
  uniqKey: string;
}
const mapStateToProps = (state: any, { uniqKey, onDisableScroll }: IOwnProps) => {
  return {
    uniqKey,
    onDisableScroll,

    account: accountSelectors.getAccount(uniqKey)(state),
    currentNode: nodesSelectors.getCurrentNode(state),
    notification: notificationsSelectors.getNotification(state, uniqKey),
    isLoggedAccount: uniqKey === authSelectors.getCurrentAccount(state),
    ecosystems: ecosystemSelectors.getEcosystems(state),
    currentRoute: navigatorSelectors.getCurrentRoute(state),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPress: (payload: { uniqKey: string; encKey: string; } | { publicKey: string; }) => {
      if (!payload.encKey) {
        dispatch(navigatorActions.navigate(navTypes.ACTIVATE_ACC, payload));
        return;
      }
      dispatch(receiveSelectedAccount.started(payload));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Row);
