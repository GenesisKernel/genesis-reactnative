import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { View as AnimatableView } from 'react-native-animatable';
import { Icon } from 'react-native-elements';

const Mask: React.SFC<any> = () => (
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

export default Mask;