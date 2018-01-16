import * as React from 'react';
import { View } from 'react-native';
import { stylable } from 'react-native-stylable';

export interface IDivProps extends IElementProps {}

const Div: React.SFC<IDivProps> = ({ children, style }) => (
  <View style={[style]}>{children}</View>
);

export default stylable('Div')(Div);
