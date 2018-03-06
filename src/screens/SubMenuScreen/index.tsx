import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from 'components/ui/theme';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import PageContainer from 'containers/PageContainer';
import MenuGridContainer from 'containers/MenuGridContainer';
import PageTitleContainer from 'containers/PageTitleContainer';
import NotificationsIconContainer from 'containers/NotificationsIconContainer';
import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{
  menu: any
}> {}

class HomeScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({ navigationOptions }): NavigationStackScreenOptions => ({
    headerTitle: <PageTitleContainer style={navigationOptions.headerTitleStyle} />,
    headerBackTitle: null,
    headerTintColor: Colors.white,
    headerRight: <NotificationsIconContainer />
  })

  public render() {
    return (
      <View style={styles.container}>
        <MenuGridContainer
          menu={this.props.navigation.state.params.menu} />
      </View>
    );
  }
}

export default HomeScreen;
