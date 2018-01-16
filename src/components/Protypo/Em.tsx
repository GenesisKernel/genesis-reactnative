import * as React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { stylable } from 'react-native-stylable';

import { extractIconParams, isIcon } from '../utils/icon';

export interface IEmProps extends IElementProps {
  style?: any;
}

const Em: React.SFC<IEmProps> = ({ style, attr, children }) => {
  return isIcon(attr.class) ? (
    <Icon iconStyle={[style]} size={18} {...extractIconParams(attr.class)} />
  ) : (
    <View style={[style]}>{children}</View>
  );
};

export default stylable('Em')(Em);
