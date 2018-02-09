import * as React from 'react';
import { View } from 'react-native';
import { Colors } from 'components/ui/theme';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import PageContainer from 'containers/PageContainer';
import StatusIconContainer from 'containers/StatusIconContainer';
import PageTitleContainer from 'containers/PageTitleContainer';
import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{}> {}

class PageScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({
    navigationOptions
  }): NavigationStackScreenOptions => ({
    headerTitle: (
      <PageTitleContainer style={navigationOptions.headerTitleStyle} />
    ),
    headerTintColor: Colors.dark,
    headerRight: <StatusIconContainer />,
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
