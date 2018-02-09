import * as React from 'react';
import { ImageBackground, Text, View } from 'react-native';

const hoistNonReactStatics = require('hoist-non-react-statics');


export default (Component: any, type = 'violet') => {
  const imagePath = type === 'violet'
    ? require('../../../../assets/images/bg.png')
    : require('../../../../assets/images/BgGreen.png');

  const WrappedComponent = (props: any) => {
    return (
      <ImageBackground
        source={imagePath}
        style={{ flex: 1 }}>
        <Component {...props}/>
      </ImageBackground>
    )
  }
  return hoistNonReactStatics(WrappedComponent, Component)
}