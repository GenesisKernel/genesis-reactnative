import * as React from 'react';
import { View, Button } from 'react-native';
import ProtypoContainer from 'containers/Protypo/ProtypoContainer';

import styles from './styles';
interface INotificationsPage {
  onClose: () => void;
}

export default class NotificationsPage extends React.Component<INotificationsPage> {
  public render() {
    return (
      <View style={styles.container}>
        <ProtypoContainer pageId="notifications_testpage"/>
      </View>
    );
  }
}