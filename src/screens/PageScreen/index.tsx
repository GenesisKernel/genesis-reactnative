import * as React from 'react'
import { View } from 'react-native'
import { NavigationStackScreenOptions, NavigationScreenProps } from 'react-navigation'

import HomeButton from 'components/HomeButton'
import BackButtonContainer from 'containers/BackButtonContainer'
import PageContainer from 'containers/PageContainer'
import PageTitleContainer from 'containers/PageTitleContainer'
import NotificationsIconContainer from 'containers/NotificationsIconContainer'
import styles from './styles'

interface IScreenProps extends NavigationScreenProps<{}> {}
interface INavigationOptions {
  navigationOptions: any
  navigation: any
}

class PageScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({
    navigationOptions, 
    navigation
  }:INavigationOptions): NavigationStackScreenOptions => {
    const  withGoHomeButton = navigation.state.params.withGoHomeButton
    return {
      headerTitle: navigation.state.params.withGoHomeButton ? (
        'Notifications'
      ) : (
        <PageTitleContainer style={navigationOptions.headerTitleStyle} />
      ),
      headerRight: <NotificationsIconContainer />,
      headerBackTitle: null,
      headerLeft: withGoHomeButton ? <HomeButton dispatch={navigation.dispatch} /> : 
       (
        <BackButtonContainer
          navigation={navigation}
          dispatch={navigation.dispatch}
        />
      ),
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
