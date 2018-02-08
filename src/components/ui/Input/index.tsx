import * as React from 'react';
import { TextInput, TextInputProperties, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { FormattedMessage } from 'react-intl';

import Text from '../Text';
import styles from './styles';

interface IInputProps extends TextInputProperties {
  intl: FormattedMessage.MessageDescriptor;
  rightIcon?: string;
}

const Input: React.SFC<IInputProps> = props => {
  const { intl, rightIcon, ...inputProps } = props;

  return (
    <FormattedMessage {...intl}>
      {(title: string) => {
        return (
          <View style={styles.container}>
            <Text style={styles.inputLabel}>{title}</Text>
            <TextInput
              {...inputProps}
              style={[
                styles.input,
                inputProps.style,
                props.multiline && styles.multiline,
                !!rightIcon && styles.rightIcon,
              ]}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              selectionColor="#fff"
            />
            {!!rightIcon && (
              <Icon iconStyle={styles.icon} type="font-awesome" name={rightIcon} />
            )}
          </View>
        );
      }}
    </FormattedMessage>
  );
};

export default Input;
