import * as React from 'react';
import { Text as TextDefault, TextProperties } from 'react-native';
import styles from './styles';

interface ITextProps extends TextProperties {
  children: string;
  style?: any;
}

const Text: React.SFC<ITextProps> = ({ style, children, ...rest }) => {
  return (
    <TextDefault {...rest} style={[styles.text, style]}>
      {children}
    </TextDefault>
  );
};

export default Text;
