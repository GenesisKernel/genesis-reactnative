import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as CodePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { AppRegistry, AppState } from 'react-native';

import * as Push from 'appcenter-push';

import store from 'modules/store';
import NavigatorContainer from 'containers/NavigationContainer';
import AlertContainer from 'containers/AlertContainer';
import StatusBarContainer from 'containers/StatusBarContainer';
import MainBackgroundImageContainer from 'containers/MainBackgroundImageContainer';
import AnimatedDrawerContainer from 'containers/AnimatedDrawerContainer';
import ModalsContainer from 'containers/ModalsContainer';
import Text from 'components/ui/Text';

import { URL_PREFIX } from './constants';

export default class App extends React.Component<{},{}> {

  public componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  public render() {
    return (
      <Provider store={store}>
        <MainBackgroundImageContainer backgroundImage="violet">
          <StatusBarContainer />
          <AlertContainer />
          <IntlProvider locale="en" defaultLocale="en" textComponent={Text}>
            <AnimatedDrawerContainer>
              <ModalsContainer />
              <NavigatorContainer
                uriPrefix={URL_PREFIX}/>
            </AnimatedDrawerContainer>
          </IntlProvider>
        </MainBackgroundImageContainer>
      </Provider>
    );
  }

  private handleAppStateChange = (nextState: string) => {
    if (nextState === 'active') {
      CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE });
    }
  }

}

AppRegistry.registerComponent('Apla', () =>
  CodePush({
    updateDialog: true,
    installMode: CodePush.InstallMode.IMMEDIATE
  })(App)
);
