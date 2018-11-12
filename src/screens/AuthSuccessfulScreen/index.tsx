import * as React from 'react';
import { View } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { pathOr } from 'ramda';

import { navTypes } from '../../constants';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import styles from './styles';

const isKnownAccount = pathOr(false)(['state', 'params', 'isKnownAccount']);
const nextButtonIntl = {
  id: "signup.button.next",
  defaultMessage: 'Next'
};

interface IScreenProps
  extends NavigationScreenProps<{
      isKnownAccout: boolean;
    }> {}

class AuthSuccessfulScreen extends React.Component<IScreenProps> {
  public static navigationOptions = ({
    navigation, navigationOptions
  }): NavigationStackScreenOptions => {
    const titleIntl = isKnownAccount(navigation) ? {
      id: "auth.success.account.connected",
      defaultMessage: "'Account connected",
    } : {
      id: "auth.success.account.created",
      defaultMessage: "Account created",
    }

    return {
      headerLeft: <View />,
      gesturesEnabled: false,
      headerTitle: <Text
        style={navigationOptions.headerTitleStyle}
        intl={titleIntl}/>
    };
  }

  public render() {
    const textIntl = isKnownAccount(this.props.navigation) ? {
      defaultMessage: 'You logged under known account.',
      id: 'auth.success.known.account.logged',
    } : {
      defaultMessage: 'Your account was created in Apla Blockchain.',
      id: 'auth.success.account.created.blockchain'
    }
    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Icon
            size={96}
            iconStyle={styles.icon}
            name="thumbs-o-up"
            type="font-awesome"
          />
          <Text style={styles.title} intl={{
            id: "auth.success.congratulations",
            defaultMessage: "Congratulations!",
          }}/>
          <Text style={styles.text} intl={textIntl}/>
        </View>
        <Button
          buttonStyle={styles.nextButton}
          intl={nextButtonIntl}
          onPress={this.handleNextButtonPress} />
      </View>
    );
  }

  private handleNextButtonPress = () => {
    const { navigation } = this.props;
    if (isKnownAccount(navigation)) {
      this.props.navigation.navigate(navTypes.HOME);
    } else {
      this.props.navigation.navigate(navTypes.ACCOUNT_SELECT);
    }
  }
}

export default AuthSuccessfulScreen;
