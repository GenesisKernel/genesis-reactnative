import * as React from 'react';
import { View } from 'react-native';
import styles from './styles';

interface IFieldProps {
  children: JSX.Element | JSX.Element[];
  style?: any;
}

const Field: React.SFC<IFieldProps> = props => {
  return <View style={[styles.field, props.style]}>{props.children}</View>;
};

export default Field;
