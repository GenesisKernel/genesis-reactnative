import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, DeviceInfo, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { View as AnimatableView } from 'react-native-animatable';

import MenuContainer from 'containers/MenuContainer';
import AccountListContainer from 'containers/AccountListContainer';
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';
import AppVersion from 'components/AppVersion';
import Logo from 'components/ui/Logo';

import styles from './styles';
import TransactionsContainer from 'containers/TransactionsContainer';

interface IDrawerContentProps {
  currentAccountAddress: string;
  logout: () => void;
  switchAccount: (accountAdress: string, ecosystemId: string) => void;
}

interface IDrawerContentState {
  showAccountList: boolean;
  isIphoneX: boolean;
  activeTab: string;
  showDecor: string;
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

const tabButtons = [
  {
    title: 'Accounts',
    payload: 'accounts',
  },
  {
    title: 'Transactions',
    payload: 'transactions',
  },
];

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
      activeTab: 'accounts',
      showDecor: 'fadeOut',
    };
  }

  public render() {
    const { isIphoneX, activeTab, showDecor } = this.state;

    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' }}>
        <View style={[styles.insetContainer, { paddingBottom: isIphoneX ? 34 : 0 }]}>
          <Logo />
          <View style={styles.switcher}>
            {tabButtons.map((item, i) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => this.handlePressTab(item.payload)}
                  key={i}>
                  <View style={styles.switcherButtonWrapper}>
                    <Text style={styles.switcherButtonTitle}>{item.title}</Text>
                    <AnimatableView
                      animation={item.payload === activeTab ? 'fadeIn' : 'fadeOut'}
                      easing="linear"
                      duration={150}
                      useNativeDriver
                      iterationCount={1}
                      style={styles.decorLine}/>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
          {activeTab === 'accounts'
            ? (
              <AnimatableView
                easing="linear"
                duration={250}
                iterationCount={1}
                useNativeDriver
                style={styles.listContainer}
                animation={'fadeIn'}>
                <AccountListContainer noTitle />
              </AnimatableView>
            )
            : (
              <AnimatableView
                easing="linear"
                duration={250}
                iterationCount={1}
                useNativeDriver
                style={styles.listContainer}
                animation={'fadeOut'}>
                <TransactionsContainer />
              </AnimatableView>
            )
          }
          <TouchableHighlight
            style={styles.logoutButton}
            onShowUnderlay={() => this.handleUnderlay('fadeIn')}
            onHideUnderlay={() => this.handleUnderlay('fadeOut')}
            activeOpacity={0.8}
            underlayColor={`transparent`}
            onPress={this.handleLogoutButtonPress}
          >
            <View style={styles.logoutTextContainer}>
              <Text style={styles.logoutText}>Logout</Text>
              <AnimatableView
                animation={showDecor}
                easing="linear"
                duration={100}
                useNativeDriver
                iterationCount={1}
                style={styles.decorStick} />
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }

  private handleUnderlay = (value: string) => {
    if (this.state.showDecor !== value) {
      this.setState({ showDecor: value });
    }
  }

  private handlePressTab = (value: string) => {
    const { activeTab } = this.state;

    if (value !== activeTab) {
      this.setState({
        activeTab: value,
      });
    }
  }

  private handleTogglePress = () => {
    this.setState(prevState => ({
      showAccountList: !prevState.showAccountList
    }));
  }

  private handleAccountSelect = (accountAdress: string, ecosystemId: string) => {
    this.context.drawer.close(() => {
      this.props.switchAccount(accountAdress, ecosystemId);
    });
  }

  private handleLogoutButtonPress = () => {
    this.context.drawer.close(() => {
      this.props.logout();
    });
  }
}

export default DrawerContent;
