import * as React from 'react';
import { View } from 'react-native';
import { stylable } from 'react-native-stylable';

export interface IPProps extends IElement {
  style?: any;
}

const P: React.SFC<IPProps> = props => (
  <View style={[props.style]}>{props.children}</View>
);

export default stylable('P')(P);
