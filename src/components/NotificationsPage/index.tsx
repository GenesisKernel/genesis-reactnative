import * as React from 'react';
import { View, Button } from 'react-native';
import ProtypoContainer from 'containers/Protypo/ProtypoContainer';

import styles from './styles';

export default class NotificationsPage extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <ProtypoContainer pageId="notifications_testpage"/>
      </View>
    );
  }
}