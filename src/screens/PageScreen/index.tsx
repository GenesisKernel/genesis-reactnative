import * as React from 'react';
import { View } from 'react-native';
import { Colors } from 'components/ui/theme';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import HomeButton from 'components/HomeButton';
import PageContainer from 'containers/PageContainer';
import PageTitleContainer from 'containers/PageTitleContainer';
import NotificationsIconContainer from 'containers/NotificationsIconContainer';

import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{}> {}

class PageScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({
    navigationOptions, navigation
  }): NavigationStackScreenOptions => {
    return {
      headerTitle: navigation.state.params.withGoHomeButton
        ? 'Notifications'
        : <PageTitleContainer style={navigationOptions.headerTitleStyle} />,
      headerRight: <NotificationsIconContainer />,
      headerBackTitle: null,
      headerLeft: navigation.state.params.withGoHomeButton && <HomeButton dispatch={navigation.dispatch} />
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <PageContainer />
      </View>
    );
  }
}

export default PageScreen;
