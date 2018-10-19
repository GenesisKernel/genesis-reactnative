import * as React from 'react';
import { View } from 'react-native';
import { WrappedFieldProps } from 'redux-form';

interface IHiddenInputProps extends WrappedFieldProps {
  defaultValue?: string;
}

class HiddenInput extends React.PureComponent<IHiddenInputProps> {
  public componentDidMount() {
    this.props.input.onChange(this.props.defaultValue);
  }

  public render() {
    return <View />;
  }
}

export default HiddenInput;
