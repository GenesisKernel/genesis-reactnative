import * as React from 'react';
import { View, Platform } from 'react-native';
import Drawer from 'react-native-drawer';
import DrawerContentContainer from 'containers/DrawerContentContainer';
import NavigatorContainer from 'containers/NavigationContainer';
import { URL_PREFIX } from '../../constants';
import { openDrawerOffset } from 'components/ui/theme';
import styles from './styles';

export interface IAnimatedDrawerProps {
  children: any,
  isAuthRoute: boolean;
  isAuthenticated: boolean;
  drawerOpen: boolean;
  onToggleDrawer: (value: boolean) => void;
}

export default class AnimatedDrawer extends React.Component<IAnimatedDrawerProps, {}> {

  public render() {
    const { isAuthRoute, isAuthenticated, onToggleDrawer, drawerOpen } = this.props;

    return (
      <Drawer
        onClose={() => this.toggleDrawerHandler(false)}
        onOpen={() => this.toggleDrawerHandler(true)}
        open={drawerOpen}
        type="displace"
        tapToClose
        content={<DrawerContentContainer />}
        openDrawerOffset={openDrawerOffset}
        elevation={1}
        styles={{ drawer: { shadowColor: 'transparent', shadowOpacity: 0, shadowRadius: 0, elevation: 0 }, main: { overflow: 'hidden' }}}
        panOpenMask={3}
        captureGestures
        useInteractionManager
        tweenHandler={this.gestureCapturer}
        disabled={!isAuthenticated || isAuthRoute}
      >
        {!isAuthRoute
          ? (
              <View
                style={[styles.animatedWrapper]}>
                {this.props.children}
              </View>
          )
          : (
            this.props.children
          )
        }
      </Drawer>
    );
  }

  private gestureCapturer = (ratio: number) => {
    const radius = Platform.OS === 'ios' ? {
      borderBottomLeftRadius: ratio * 24,
      borderTopLeftRadius: ratio * 24,
    } : {};
    return {
      main: {
        transform: [{ scaleY: 1 - ratio /10 }],
        ...radius,
      }
    }
  }

  private toggleDrawerHandler = (value: boolean) => {
    const { drawerOpen } = this.props;
    if (drawerOpen !== value) {
      setTimeout(() => {
        this.props.onToggleDrawer(value)
      }, 50);
    }
  }
}