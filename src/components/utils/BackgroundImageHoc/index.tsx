import * as React from 'react';
import { ImageBackground, Text, View, Image } from 'react-native';

const hoistNonReactStatics = require('hoist-non-react-statics');
import styles from './styles';

export default (Component: any, type = 'violet') => {
  const imagePath = type === 'violet'
    ? require('../../../../assets/images/bg.png')
    // : require('../../../../assets/images/BgGreen.png');
    : require('../../../../assets/images/newBg.png');

  const WrappedComponent = (props: any) => {

    return (
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="cover"
          style={styles.bgImage}
          source={imagePath}
        />
          <Component {...props}/>
      </View>
    )
  }
  return hoistNonReactStatics(WrappedComponent, Component)
}