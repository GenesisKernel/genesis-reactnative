import * as React from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View as AnimatableView } from 'react-native-animatable';

import Mask from 'components/Mask';
import ProtypoContainer from 'containers/Protypo/ProtypoContainer';
import styles from './styles';

class Page extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="always"
        >
          <ProtypoContainer />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Page;
