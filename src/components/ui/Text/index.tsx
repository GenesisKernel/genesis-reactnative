import * as React from 'react';
import { Text as TextDefault, TextProperties } from 'react-native';
import { FormattedMessage } from 'react-intl';
import styles from './styles';

interface ITextProps extends TextProperties {
  children?: string;
  style?: any;
  intl?: FormattedMessage.MessageDescriptor;
}

const Text: React.SFC<ITextProps> = ({ style, children, intl, ...rest }) => {
  if (intl) {
    return (
      <FormattedMessage {...intl}>
        {(title: string) => (
          <TextDefault {...rest} style={[styles.text, style]}>
            {title}
          </TextDefault>
        )}
      </FormattedMessage>
    );
  }

  return (
    <TextDefault {...rest} style={[styles.text, style]}>
      {children}
    </TextDefault>
  );
};

export default Text;
