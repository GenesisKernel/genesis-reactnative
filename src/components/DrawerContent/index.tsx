import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, TouchableOpacity, DeviceInfo } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import MenuContainer from 'containers/MenuContainer';
import AccountListContainer from 'containers/AccountListContainer';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import AppVersion from 'components/AppVersion';
import styles from './styles';

interface IDrawerContentProps {
  currentAccountId: string;
  logout: () => void;
  switchAccount: (accountId: string, ecosystemId: string) => void;
}

interface IDrawerContentState {
  showAccountList: boolean;
  isIphoneX: boolean;
}

const logoutButtonProps = {
  intl: {
    id: 'logout',
    defaultMessage: 'Logout'
  }
};

const avatarDefaultProps = {
  iconStyle: {
    color: '#fff'
  },
  type: 'font-awesome',
  name: 'user-circle',
  size: 32
};

class DrawerContent extends React.Component<
  IDrawerContentProps,
  IDrawerContentState
> {
  public static contextTypes = {
    drawer: PropTypes.object
  };

  constructor(props: IDrawerContentProps) {
    super(props);

    this.state = {
      showAccountList: false,
      isIphoneX: DeviceInfo.isIPhoneX_deprecated,
    };
  }

  public render() {
    const { isIphoneX } = this.state;

    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' }}>
        <View style={[styles.insetContainer, { paddingBottom: isIphoneX ? 34 : 0 }]}>
          <View style={styles.profile}>
            <View>
              <Icon {...avatarDefaultProps} />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.handleTogglePress}
            >
              <View style={styles.accountAdress}>
                <Text style={styles.accountAdressText} numberOfLines={1} ellipsizeMode="middle">
                  {this.props.currentAccountId}
                </Text>
                <Icon
                  name={
                    this.state.showAccountList
                      ? 'arrow-drop-up'
                      : 'arrow-drop-down'
                  }
                  size={32}
                  color="#fff"
                />
              </View>
            </TouchableOpacity>
          </View>
          {!this.state.showAccountList && (
            <View style={styles.menu}>
              {/* <MenuContainer /> */}
            </View>
          )}
          {this.state.showAccountList && (
            <View style={styles.accountList}>
              <AccountListContainer onSelect={this.handleAccountSelect} />
            </View>
          )}
          <View style={styles.bottomActions}>
            <AppVersion />
            <Button
              containerViewStyle={styles.logoutButton}
              onPress={this.handleLogoutButtonPress}
              {...logoutButtonProps}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  private handleTogglePress = () => {
    this.setState(prevState => ({
      showAccountList: !prevState.showAccountList
    }));
  }

  private handleAccountSelect = (accountId: string, ecosystemId: string) => {
    this.context.drawer.close(() => {
      this.props.switchAccount(accountId, ecosystemId);
    });
  }

  private handleLogoutButtonPress = () => {
    this.context.drawer.close(() => {
      this.props.logout();
    });
  }
}

export default DrawerContent;
