import * as React from 'react';
import { View } from 'react-native';
import { stylable } from 'react-native-stylable';

export interface ISpanProps extends IElementProps {}

const Span: React.SFC<ISpanProps> = props => (
  <View style={[props.style]}>{props.children}</View>
);

export default stylable('Span')(Span);
