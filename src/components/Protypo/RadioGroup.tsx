import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FieldType } from 'redux-form';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Field, WrappedFieldProps, BaseFieldProps } from 'redux-form';

import defaultStyles from './RadioGroup.style';

type Value = string | number;
type Label = string;

export interface IOption {
  value: Value;
  label: Label;
}

export interface IRadioGroupProps extends IElementProps {
  attr: {
    source?: string;
    namecolumn?: string;
    valuecolumn?: string;
    name: string;
    value?: string;
    validate?: IValidation;
  };
}

interface IRadioProps {
  value: Value;
  label: Label;
  selected: boolean;

  onPress(value: Value): void;
}

const defaultIconProps = {
  name: 'circle-o',
  type: 'font-awesome'
};
const selectedIconProps = {
  name: 'check-circle',
  type: 'font-awesome'
};

const RadioItem: React.SFC<IRadioProps> = ({
  value,
  label,
  onPress,
  selected
}) => (
  <TouchableOpacity
    style={defaultStyles.radioItem}
    onPress={onPress.bind(undefined, value)}
    activeOpacity={0.8}
  >
    <Icon {...(selected ? selectedIconProps : defaultIconProps)} />
    <Text style={defaultStyles.radioItemLabel}>{label}</Text>
  </TouchableOpacity>
);

class RadioItems extends React.PureComponent<
  IRadioGroupProps & WrappedFieldProps & { options: IOption[] }
> {
  public render() {
    const { meta, input, options } = this.props;

    const showError = meta.submitFailed && meta.invalid;

    return (
      <View>
        {options.map(option => (
          <RadioItem
            {...option}
            key={option.value}
            selected={input.value === option.value}
            onPress={this.handlePress}
          />
        ))}
        {showError && <Text style={defaultStyles.errorText}>{meta.error}</Text>}
      </View>
    );
  }

  private handlePress = (value: Value) => {
    this.props.input.onChange(value);
  }
}

class RadioGroup extends React.PureComponent<
  IRadioGroupProps & BaseFieldProps
> {
  public static contextTypes = {
    _reduxForm: PropTypes.any,
    validators: PropTypes.any,
    dataSource: PropTypes.any
  };

  constructor(props: IRadioGroupProps) {
    super(props);

    this.state = {
      options: []
    };
  }

  public componentWillReceiveProps(nextProps: IRadioGroupProps) {
    this.setState({
      options: this.extractOptions(nextProps)
    });
  }

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

    this.setState({
      options: this.extractOptions(this.props)
    });
  }

  public render() {
    const { name, value } = this.props.attr;

    return (
      <Field
        name={name}
        value={value}
        component={RadioItems}
        props={{
          options: this.state.options
        }}
      />
    );
  }

  private extractOptions = (props: IRadioGroupProps) => {
    const source = this.context.dataSource.get(props.attr.source);

    let options: IOption[] = [];

    if (source) {
      const labelIndex = source.columns.indexOf(props.attr.namecolumn);
      const valueIndex = source.columns.indexOf(props.attr.valuecolumn);
      const nameType = source.types[labelIndex];

      options = source.data.map((option: any) => {
        return {
          label: option[labelIndex],
          value: option[valueIndex]
        };
      });
    }

    return options;
  }
}

export default RadioGroup;
