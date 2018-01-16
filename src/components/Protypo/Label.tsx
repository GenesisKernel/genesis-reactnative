import * as React from 'react';
import { View } from 'react-native';
import { stylable } from 'react-native-stylable';

import defaultStyles from './Label.style';

export interface ILabelProps extends IElementProps {}

const Label: React.SFC<ILabelProps> = props => (
  <View style={[defaultStyles.label, props.style]}>{props.children}</View>
);

export default stylable('Label')(Label);
