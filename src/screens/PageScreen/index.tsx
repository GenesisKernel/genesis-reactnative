import * as React from 'react';
import { View } from 'react-native';
import { NavigationStackScreenOptions, NavigationScreenProps } from 'react-navigation';
import HomeButton from 'components/HomeButton';
import PageContainer from 'containers/PageContainer';
import PageTitleContainer from 'containers/PageTitleContainer';
import NotificationsIconContainer from 'containers/NotificationsIconContainer';
import DrawerButtonContainer from 'containers/DrawerButtonContainer';
import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{}> {}
interface INavigationOptions {
  navigationOptions: any;
  navigation: any;
}

class PageScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({ navigationOptions, navigation }: INavigationOptions): NavigationStackScreenOptions => {
    return {
      headerTitle: navigation.state.params.withGoHomeButton ? (
        'Notifications'
      ) : (
        <PageTitleContainer style={navigationOptions.headerTitleStyle} />
      ),
      headerBackTitle: null,
      headerLeft: <DrawerButtonContainer />,
      headerRight: <NotificationsIconContainer />,
    };
  };

  public render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <PageContainer navigation={navigation} />
      </View>
    );
  }
}

export default PageScreen;
