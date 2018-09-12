import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { stylable } from 'react-native-stylable';
import { Field, WrappedFieldProps, BaseFieldProps } from 'redux-form';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

import defaultStyles from './Input.style';
import InputDate from 'components/ui/InputDate';

type InputType = 'date' | 'text' | 'file';

export interface IInputProps extends IElementProps {
  attr: {
    type: InputType;
    name: string;
    value?: string;
    placeholder?: string;
    validate?: IValidation;
  };
}

const InputWrapper: React.SFC<IInputProps & WrappedFieldProps> = ({
  input,
  meta,
  style,
  placeholder
}) => {
  const showError = meta.submitFailed && meta.invalid;

  return (
    <View style={[defaultStyles.container, style]}>
      <TextInput
        style={[defaultStyles.input, showError && defaultStyles.invalid]}
        value={input.value}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        placeholder={placeholder}
        autoCorrect={false}
        underlineColorAndroid="transparent"
      />
      {showError && <Text style={defaultStyles.errorText}>{meta.error}</Text>}
    </View>
  );
};

const InputDateWrapper: React.SFC<IInputProps & WrappedFieldProps> = ({
  input,
  meta,
  style,
  placeholder
}) => {
  const showError = meta.submitFailed && meta.invalid;

  return (
    <View style={[style]}>
      <InputDate
        style={[showError && defaultStyles.invalid]}
        value={input.value}
        onChange={input.onChange}
        placeholder={placeholder}
      />
      {showError && <Text style={defaultStyles.errorText}>{meta.error}</Text>}
    </View>
  );
};

class FileInput extends React.Component<IInputProps & WrappedFieldProps> {
  public state = {
    pickedFile: 'PICK FILE',
  };

  public setPick = () => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      if (error) {
        console.log('ERROR IN FILE PICK');
        return;
      }
      this.setState({ pickedFile: res.uri });

      this.props.input.onChange({
        uri: res.uri,
        name: res.fileName,
        type: res.type,
      });
    });
  }

  public render() {
    return(
      <TouchableOpacity
        style={defaultStyles.filePicker}
        onPress={this.setPick}
      >
        <Text style={defaultStyles.filePickerText}>
          {this.state.pickedFile}
        </Text>
      </TouchableOpacity>
    );
  }
}

const getInputByType = (type: InputType) => {
  switch (type) {
    case 'date':
      return InputDateWrapper;

    case 'text':
      return InputWrapper;

    case 'file':
      return FileInput;

    default:
      return InputWrapper;
  }
};

class Input extends React.PureComponent<IInputProps & BaseFieldProps> {
  public static contextTypes = {
    _reduxForm: PropTypes.any,
    validators: PropTypes.any
  };

  public componentWillMount() {
    const { name, validate } = this.props.attr;

    if (validate) {
      Object.keys(validate).forEach(rule => {
        this.context.validators.setRule(name, rule, {
          value: validate[rule],
          message: 'This field contains invalid data'
        });
      });
    }
  }

  public componentDidMount() {
    const { _reduxForm } = this.context;
    const { name, value } = this.props.attr;

    //  Set default value if preset
    if (value) {
      _reduxForm.dispatch(_reduxForm.change(name, value));
    }
  }

  public render() {
    const { placeholder, value, name, type } = this.props.attr;

    return (
      <Field
        props={{
          style: this.props.style,
          placeholder
        }}
        value={value}
        name={name}
        component={getInputByType(type)}
      />
    );
  }
}

export default stylable('Input')(Input);
