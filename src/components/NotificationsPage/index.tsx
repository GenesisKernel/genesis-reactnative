import * as React from 'react';
import { View, ScrollView } from 'react-native';
import ProtypoContainer from 'containers/Protypo/ProtypoContainer';

import styles from './styles';

export default class NotificationsPage extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ProtypoContainer pageId="notifications"/>
        </ScrollView>
      </View>
    );
  }
}
