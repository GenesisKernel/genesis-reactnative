import * as React from 'react';
import { View } from 'react-native';
import { stylable } from 'react-native-stylable';

export interface IStrongProps extends IElementProps {}

const Strong: React.SFC<IStrongProps> = props => (
  <View style={[props.style]}>{props.children}</View>
);

export default stylable('Strong')(Strong);
