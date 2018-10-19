import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Field, WrappedFieldProps, BaseFieldProps } from 'redux-form';
import ImagePicker from 'react-native-image-crop-picker';
import { stylable } from 'react-native-stylable';

import defaultStyles from './Input.style';
import InputImage from 'components/ui/InputImage';

type FormatType = 'png' | 'jpg' | 'jpeg';

export interface IInputProps extends IElementProps {
  attr: {
    name: string;
    value?: string;
    aspectRatio?: number;
    width?: number;
    format: FormatType;
    placeholder?: string;
    validate?: IValidation;
  };
}

const InputImageWrapper: React.SFC<IInputProps & WrappedFieldProps> = ({
  input,
  meta,
  style,
  placeholder
}) => {
  const showError = meta.submitFailed && meta.invalid;

  return (
    <View style={[style]}>
      <InputImage
        style={[showError && defaultStyles.invalid]}
        value={input.value}
        onChange={input.onChange}
        placeholder={placeholder}
      />
      {showError && <Text style={defaultStyles.errorText}>{meta.error}</Text>}
    </View>
  );
};

class ImageInput extends React.PureComponent<IInputProps & BaseFieldProps> {
  public render() {
    const { value, name, placeholder } = this.props.attr;

    return (
      <Field
        props={{
          placeholder
        }}
        value={value}
        name={name}
        component={InputImageWrapper}
      />
    );
  }
}

export default stylable('ImageInput')(ImageInput);
