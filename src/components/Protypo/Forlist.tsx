import * as React from 'react';
import { View } from 'react-native';

export interface IForListProps {

}

const ForList: React.SFC<IForListProps> = ({ children }) => {
  return (
    <View  style={[{ flexDirection: 'column', flexWrap: 'wrap' }]}>{children}</View>
  );
};

export default ForList;
