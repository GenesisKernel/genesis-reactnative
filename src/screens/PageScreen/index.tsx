import * as React from 'react';
import { View } from 'react-native';
import { Colors } from 'components/ui/theme';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import PageContainer from 'containers/PageContainer';
import PageTitleContainer from 'containers/PageTitleContainer';
import NotificationsIconContainer from 'containers/NotificationsIconContainer';
import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{}> {}

class PageScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({
    navigationOptions
  }): NavigationStackScreenOptions => ({
    headerTitle: (
      <PageTitleContainer style={navigationOptions.headerTitleStyle} />
    ),
    headerTintColor: Colors.white,
    headerRight: <NotificationsIconContainer />,
    headerBackTitle: null
  });

  public render() {
    return (
      <View style={styles.container}>
        <PageContainer />
      </View>
    );
  }
}

export default PageScreen;
