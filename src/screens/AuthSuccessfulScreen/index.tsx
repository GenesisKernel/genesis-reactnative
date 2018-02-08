import * as React from 'react';
import { View } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { pathOr } from 'ramda';

import { navTypes } from '../../navigatorConfig';
import Text from 'components/ui/Text';
import Button from 'components/ui/Button';
import styles from './styles';

const isKnownAccount = pathOr(false)(['state', 'params', 'isKnownAccount']);
const nextButtonIntl = {
  id: 'auth.successful.button.next',
  defaultMessage: 'Next'
};

interface IScreenProps
  extends NavigationScreenProps<{
      isKnownAccout: boolean;
    }> {}

class AuthSuccessfulScreen extends React.Component<IScreenProps> {
  public static navigationOptions = ({
    navigation
  }): NavigationStackScreenOptions => {
    return {
      headerLeft: <View />,
      gesturesEnabled: false,
      headerTitle: isKnownAccount(navigation)
        ? 'Account connected'
        : 'Account created'
    };
  }

  public render() {
    const text = isKnownAccount(this.props.navigation)
      ? 'You logged under known account.'
      : 'Your account was created in Apla Blockchain.';

    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Icon
            size={96}
            iconStyle={styles.icon}
            name="thumbs-o-up"
            type="font-awesome"
          />
          <Text style={styles.title}>Congratulations!</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Button
          buttonStyle={styles.nextButton}
          intl={nextButtonIntl}
          onPress={this.handleNextButtonPress} />
      </View>
    );
  }

  private handleNextButtonPress = () => {
    this.props.navigation.navigate(navTypes.HOME);
  }
}

export default AuthSuccessfulScreen;
