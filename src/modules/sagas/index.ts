// Common saga
import appcenter from './appcenter';
import seed from './seed';
import linking from './linking';
import scanner from './scanner';
import routes from './routes';
import page from './page';
import privateKey from './privateKey';
import ecosystem from './ecosystem';
import network from './network';
import account from './account';
import navigation from './navigation';
import appState from './appState';
import backButton from './hardwareBackButton';
import changePassword from './changePassword';
import compositeContracts from './compositeContracts';

export default function commonSaga() {
  return [
    appcenter(),
    seed(),
    linking(),
    scanner(),
    routes(),
    ecosystem(),
    page(),
    privateKey(),
    network(),
    account(),
    navigation(),
    appState(),
    backButton(),
    changePassword(),
    compositeContracts(),
  ];
}
