import * as React from 'react';
import { View } from 'react-native';

export interface IForListProps {

}

const ForList: React.SFC<IForListProps> = ({ children }) => {
  return (
    <View  style={[{ flexDirection: 'row', flexWrap: 'wrap' }]}>{children}</View>
  )
}

export default ForList;
