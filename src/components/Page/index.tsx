import * as React from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View as AnimatableView } from 'react-native-animatable';

import ProtypoContainer from 'containers/Protypo/ProtypoContainer';
import styles from './styles';

export interface IPageProps {
  pending?: boolean;
}

const Mask = () => (
  <View
    style={{
      zIndex: 10,
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      alignItems: 'center',
      justifyContent: 'center',
      ...StyleSheet.absoluteFillObject
    }}
  >
    <AnimatableView
      animation="rotate"
      easing="linear"
      useNativeDriver
      iterationCount="infinite"
    >
      <Icon
        name="refresh"
        size={48}
        color="#fff"
        type="font-awesome"
        underlayColor="transparent"
      />
    </AnimatableView>
  </View>
);

class Page extends React.Component<IPageProps> {
  public render() {
    return (
      <View style={styles.container}>
        {this.props.pending && <Mask />}
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
