import * as React from 'react';
import { TextInput, TextInputProperties, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { FormattedMessage } from 'react-intl';

import Text from '../Text';
import styles from './styles';

interface IInputProps extends TextInputProperties {
  intl: FormattedMessage.MessageDescriptor;
  rightIcon?: string;
  selectionColor?: string;
  labelStyle?: object;
  containerStyle?: object;
  isInvalid?: boolean;
}

const Input: React.SFC<IInputProps> = props => {
  const { intl, selectionColor, labelStyle, rightIcon, containerStyle, isInvalid, ...inputProps } = props;
  const InputProps = { ...inputProps, selectionColor }; // just to avoid warning, while selection color didn't set

  return (
    <FormattedMessage {...intl}>
      {(title: string) => {
        return (
          <View style={[styles.container, containerStyle]}>
            <Text
              style={[styles.inputLabel, labelStyle || {}]}>
              {title}
            </Text>
            <TextInput
              {...inputProps}
              style={[
                styles.input,
                inputProps.style,
                props.multiline && styles.multiline,
                !!rightIcon && styles.rightIcon,
                isInvalid ? styles.invalidInput : {},
              ]}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
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
