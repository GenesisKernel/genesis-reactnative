import * as React from 'react';
import { View } from 'react-native';

export interface IForListProps {

}

const ForList: React.SFC<IForListProps> = ({ children, style }) => (
  <View style={[style, { flexDirection: 'row' }]}>{children}</View>
);

export default ForList;
