import * as React from 'react';
import { ImageBackground, Text, View } from 'react-native';

const hoistNonReactStatics = require('hoist-non-react-statics');


export default (Component: any) => {
  const WrappedComponent = (props: any) => {
    return (
      <ImageBackground
        source={require('../../../../assets/images/bg.png')}
        style={{ flex: 1 }}>
        <Component {...props}/>
      </ImageBackground>
    )
  }
  return hoistNonReactStatics(WrappedComponent, Component)
}