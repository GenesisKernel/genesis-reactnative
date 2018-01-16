import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FieldType } from 'redux-form';

export interface IInputErrorProps extends IElementProps {}

class InputErr extends React.Component<IInputErrorProps> {
  public static contextTypes = {
    validators: PropTypes.any
  };

  public componentWillMount() {
    const { name, ...attr } = this.props.attr;

    Object.keys(attr).forEach(rule => {
      this.context.validators.setRule(name, rule, { message: attr[rule] });
    });
  }

  public render() {
    return null;
  }
}

export default InputErr;
