import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  NavigationStackScreenOptions,
  NavigationScreenProps
} from 'react-navigation';

import Logo from 'components/ui/Logo';
import MenuGridContainer from 'containers/MenuGridContainer';
import DrawerButtonContainer from 'containers/DrawerButtonContainer';
import NotificationsIconContainer from 'containers/NotificationsIconContainer';
import BackupAccountButtonContainer from 'containers/BackupAccountButtonContainer';
import ProtypoContainer from 'containers/Protypo/ProtypoContainer';
import Button from '../../components/ui/Button';

import { STATIC_PAGE, DEFAULT_PAGE } from '../../constants';
import * as page from 'modules/page';

import styles from './styles';

interface IScreenProps extends NavigationScreenProps<{}> {
  setStaticPage: (pagePayload: page.actions.IStaticPagePayload) => void;
}

class HomeScreen extends React.Component<IScreenProps, object> {
  public static navigationOptions = ({ navigationOptions }): NavigationStackScreenOptions => ({
    headerTitle: ' ',
    headerBackTitle: null,
    gesturesEnabled: false,
    headerLeft: <DrawerButtonContainer />,
    headerRight: (
      <View style={styles.rightButtons}>
        <NotificationsIconContainer />
        <BackupAccountButtonContainer />
      </View>)
  })

  public onTest = (StaticPageName: STATIC_PAGE) => {
    this.props.setStaticPage({
      name: StaticPageName, ecosystem: 'ecosystem',
      page: 'page'
    });
  }

  public render() {

    return (
      <View style={styles.container}>
        <Logo type="black" />
        <MenuGridContainer pageName={DEFAULT_PAGE} />
        <Button
          title='To Invites'
          onPress={() => this.onTest(STATIC_PAGE.invite)}
        />
        <Button
          title='To editor'
          onPress={() => this.onTest(STATIC_PAGE.editor)}
        />
        <Button
          title='To backup'
          onPress={() => this.onTest(STATIC_PAGE.backup)}
        />
      </View>
    );
  }
}

export default HomeScreen;
