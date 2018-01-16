import * as React from 'react';
import { omit } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Button as DefaultButton, ButtonProps } from 'react-native-elements';

import styles from './styles';

interface IButtonProps {
  intl?: FormattedMessage.MessageDescriptor;
  loading?: boolean; // Missing prop in the original interface
  textNumberOfLines?: number;
  textEllipsizeMode?: string;
  iconComponent?: any;
}

type Props = IButtonProps & Partial<ButtonProps>;

const Button: React.SFC<Props> = props => {
  const { buttonStyle, textStyle, containerViewStyle, ...restProps } = props;
  const defaultButtonProps: Props = {
    containerViewStyle: [styles.containerView, containerViewStyle],
    buttonStyle: [styles.button, buttonStyle],
    textStyle: [styles.text, textStyle]
  };

  const buttonProps = restProps.loading
    ? omit(['intl', 'text'])(restProps)
    : restProps;

  if (buttonProps.intl) {
    return (
      <FormattedMessage {...buttonProps.intl}>
        {(title: string) => (
          <DefaultButton
            {...buttonProps}
            {...defaultButtonProps}
            title={title.toUpperCase()}
          />
        )}
      </FormattedMessage>
    );
  }

  return <DefaultButton {...buttonProps} {...defaultButtonProps} />;
};

export default Button;
