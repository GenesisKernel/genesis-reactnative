import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as CodePush from 'react-native-code-push';
import Drawer from 'react-native-drawer';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { addNavigationHelpers, Header } from 'react-navigation';
import { AppRegistry, View, Text, StatusBar, Dimensions, Animated, Easing } from 'react-native';

import * as Push from 'appcenter-push';

import store from 'modules/store';
import NavigatorContainer from 'containers/NavigationContainer';
import DrawerContentContainer from 'containers/DrawerContentContainer';
import AlertContainer from 'containers/AlertContainer';
import StatusBarContainer from 'containers/StatusBarContainer';
import MainBackgroundImageContainer from 'containers/MainBackgroundImageContainer';
import NavigatorWrapper from './navigatorWrapper';

import { URL_PREFIX } from './constants';


export default class App extends React.Component<{}, { animationToggler: number }> {

  private radius = new Animated.Value(0);
  private transform = new Animated.Value(0);

  state = {
    animationToggler: 0,
  }


  public render() {
    const animatedStyles = {
      transform: [
      {
        scaleY: this.transform.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.9],
        }),
      }]
    }
    const opacity = {
      opacity: this.radius.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      })
    }

    return (
      <Provider store={store}>
        <MainBackgroundImageContainer backgroundImage="violet">
          <StatusBarContainer />
          <AlertContainer />
          <IntlProvider locale="en" defaultLocale="en" textComponent={Text}>
            <Drawer
              type="displace"
              tapToClose
              content={<DrawerContentContainer />}
              onOpenStart={() => this.handleOpenStart(1)}
              onCloseStart={() => this.handleOpenStart(0)}
              openDrawerOffset={0.1}
              elevation={1}
              styles={{ drawer: { shadowColor: 'transparent', shadowOpacity: 0, shadowRadius: 0, elevation: 0 }}}
              panOpenMask={3}
              captureGestures
              useInteractionManager
            >
              <View style={{ flex: 1 }}>
                <Animated.View
                  style={[opacity, { backgroundColor: '#E9EEF3', position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }]} />
                  <Animated.View
                    style={[animatedStyles, { flex: 1, backgroundColor: '#fff', overflow: 'hidden', borderBottomLeftRadius: 24, borderTopLeftRadius: 24 }]}>
                    <NavigatorContainer uriPrefix={URL_PREFIX}/>
                  </Animated.View>
              </View>
            </Drawer>
          </IntlProvider>
        </MainBackgroundImageContainer>
      </Provider>
    );
  }

  private handleOpenStart = (value: number) => {
    this.setState({ animationToggler: value }, () => {
      this.animate(value);
    });
  }

  private animate = (value: number) => {
    const normValue = value === 1 ? 0 : 1;
    this.radius.setValue(normValue);
    this.transform.setValue(normValue);

    const createAnimation = (value: any, duration: any, easing: any, delay = 0) => {
      return Animated.timing(
        value,
        {
          toValue: this.state.animationToggler,
          duration,
          easing,
          delay,
          useNativeDriver: true,
        },
      )
    }
    const radiusDelay = normValue === 0 ? 0 : 300;
    Animated.parallel([
      createAnimation(this.radius, 20, Easing.linear, radiusDelay),
      createAnimation(this.transform, 250, Easing.linear)
    ]).start()
  }

}

AppRegistry.registerComponent('Apla', () =>
  CodePush({
    updateDialog: true,
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    installMode: CodePush.InstallMode.IMMEDIATE
  })(App)
);
