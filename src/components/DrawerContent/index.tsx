import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, DeviceInfo, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { View as AnimatableView } from 'react-native-animatable';

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import ReactNativeHaptic from 'react-native-haptic';

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
  switchAccount: (accountAdress: string, ecosystemId: string) => void;
  openModal: () => void;
}

interface IDrawerContentState {
  showAccountList: boolean;
  isIphoneX: boolean;
  activeTab: string;
  showDecor: string;
}

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
    intl: {
      id: "account.list.accounts",
      defaultMessage: 'Accounts',
    },
    payload: 'accounts',
  },
  {
    intl: {
      id: 'transactions.list.transactions',
      defaultMessage: 'Transactions'
    },
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

  static prepare() {
    ReactNativeHaptic.prepare();
  }

  public render() {
    const { isIphoneX, activeTab, showDecor } = this.state;

    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' }}>
        <View style={[styles.insetContainer, { paddingBottom: isIphoneX ? 34 : 0 }]}>
          <Logo />
          {/* <Button title="test vibration" onPress={this.kek}/>
          <Button title="test vibration1" onPress={this.kek1}/> */}
          <View style={styles.switcher}>
            {tabButtons.map((item, i) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => this.handlePressTab(item.payload)}
                  key={i}>
                  <View style={styles.switcherButtonWrapper}>
                    <Text style={styles.switcherButtonTitle} intl={item.intl}/>
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
                animation={'fadeIn'}>
                <TransactionsContainer />
              </AnimatableView>
            )
          }
        </View>
      </SafeAreaView>
    );
  }

  private kek = () => {
    ReactNativeHaptic.generate('notification');
    // ReactNativeHapticFeedback.trigger('notificationWarning');
    // this.props.openModal();
  }

  private kek1 = () => {
    ReactNativeHaptic.generate('impact');
    // ReactNativeHapticFeedback.trigger('impactHeavy');
    // this.props.openModal();
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
}

export default DrawerContent;
