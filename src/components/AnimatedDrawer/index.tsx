import * as React from 'react';
import { View, Animated, Easing, Platform } from 'react-native';
import Drawer from 'react-native-drawer';
import DrawerContentContainer from 'containers/DrawerContentContainer';
import NavigatorContainer from 'containers/NavigationContainer';
import { URL_PREFIX } from '../../constants';

import styles from './styles';

export interface IAnimatedDrawerProps {
  children: any,
  isAuthRoute: boolean;
  isAuthenticated: boolean;
}

export default class AnimatedDrawer extends React.PureComponent<IAnimatedDrawerProps, {animationToggler: number}> {

  private radius = new Animated.Value(0);

  state = {
    animationToggler: 0,
  }

  public render() {
    const animatedStyles = Platform.OS === 'ios' ? {
      borderBottomLeftRadius: this.radius.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 24],
      }),
      borderTopLeftRadius: this.radius.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 24],
      }),
    } : {};

    const { isAuthRoute, isAuthenticated } = this.props;

    return (
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
        tweenHandler={this.gestureCapturer}
        disabled={!isAuthenticated}
      >
        {!isAuthRoute
          ? (
              <Animated.View
                style={[animatedStyles, styles.animatedWrapper]}>
                {this.props.children}
              </Animated.View>
          )
          : (
            this.props.children
          )
        }
      </Drawer>
    );
  }

  private gestureCapturer = (ratio: number) => {
    return { main: { transform: [{ scaleY: 1 - ratio /10 }] } }
  }

  private handleOpenStart = (value: number) => {
    if (Platform.OS === 'ios') {
      this.setState({ animationToggler: value }, () => {
        this.animate(value);
      });
    }
  }

  private animate = (value: number) => {
    const normValue = value === 1 ? 0 : 1;
    this.radius.setValue(normValue);

    const createAnimation = (value: any, duration: number, easing: any, delay = 0) => {
      return Animated.timing(
        value,
        {
          toValue: this.state.animationToggler,
          duration,
          easing,
          delay,
        },
      )
    }
    const radiusDelay = normValue === 0 ? 0 : 300;
    Animated.parallel([
      createAnimation(this.radius, 200, Easing.linear)
    ]).start();
  }
}