import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FieldType } from 'redux-form';
import * as ModalDropdown from 'react-native-modal-dropdown';
import { stylable } from 'react-native-stylable';
import { Field, WrappedFieldProps, BaseFieldProps } from 'redux-form';

import defaultStyles from './Select.style';

export interface ISelectProps extends IElementProps {
  attr: {
    source?: string;
    namecolumn?: string;
    valuecolumn?: string;
    value?: string;
    name: string;
    validate?: IValidation;
  };
}

export interface IOption {
  label: string;
  value: string;
}

const extractLabels = (options: IOption[]) =>
  options.map(option => option.label);

class SelectInner extends React.Component<
  ISelectProps &
    WrappedFieldProps & {
      options: IOption[];
    }
> {
  public render() {
    const { meta, input, options } = this.props;
    return (
      <ModalDropdown
        options={extractLabels(options)}
        onSelect={this.handleSelect}
        style={defaultStyles.dropdown}
        textStyle={defaultStyles.dropdownValueText}
        dropdownStyle={defaultStyles.dropdownModal}
        dropdownTextStyle={defaultStyles.dropdownModalValueText}
      />
    );
  }

  private handleSelect = (index: number) => {
    this.props.input.onChange(this.props.options[index].value);
  }
}

class Select extends React.PureComponent<ISelectProps & BaseFieldProps> {
  public static contextTypes = {
    _reduxForm: PropTypes.any,
    validators: PropTypes.any,
    dataSource: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.state = {
      options: []
    };
  }

  public componentWillReceiveProps(nextProps) {
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

    //  Set default value if present
    if (value) {
      _reduxForm.dispatch(_reduxForm.change(name, value));
    }

    this.setState({
      options: this.extractOptions(this.props)
    });
  }

  public render() {
    const { value, name } = this.props.attr;

    return (
      <Field
        name={name}
        value={value}
        component={SelectInner}
        props={{ options: this.state.options }}
      />
    );
  }

  private extractOptions = (props: ISelectProps) => {
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

export default stylable('Select')(Select);
