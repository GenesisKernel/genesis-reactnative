// Common saga
import appcenter from './appcenter';
import seed from './seed';
import linking from './linking';
import scanner from './scanner';
import routes from './routes';
import page from './page';
import ecosystem from './ecosystem';
import network from './network';
import account from './account';

export default function commonSaga() {
  return [
    appcenter(),
    seed(),
    linking(),
    scanner(),
    routes(),
    ecosystem(),
    page(),
    network(),
    account()
  ];
}
