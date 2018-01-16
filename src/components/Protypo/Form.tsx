import * as React from 'react';
import * as PropTypes from 'prop-types';
import { compose, isEmpty } from 'ramda';
import { View } from 'react-native';
import { stylable } from 'react-native-stylable';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError, InjectedFormProps } from 'redux-form';

import * as page from 'modules/page';
import Validators from './utils/Validators';

export interface IFormProps extends IElementProps {}

const FormInner: React.SFC<IFormProps> = ({ style, children }) => (
  <View style={[style]}>{children}</View>
);

const ReduxForm = compose(reduxForm({}), stylable('Form'))(FormInner);

class Form extends React.PureComponent<{
  form: string;
}> {
  public static childContextTypes = {
    validators: PropTypes.object.isRequired
  };

  private validators: Validators;

  constructor(props: any) {
    super(props);

    this.validators = new Validators();
  }

  public getChildContext() {
    return {
      validators: this.validators
    };
  }

  public render() {
    const { form, ...formProps } = this.props;

    return (
      <ReduxForm pure form={form} onSubmit={this.handleSubmit} {...formProps} />
    );
  }

  private handleSubmit = (
    values: any,
    dispatch: any,
    props: InjectedFormProps
  ) => {
    if (!props.registeredFields) {
      return undefined;
    }

    const errors = Object.keys(props.registeredFields).reduce(
      (acc: { [field: string]: string }, field) => {
        if (!this.validators.hasRule(field)) {
          return acc;
        }

        const error = this.validators.validateRule(field, values[field]);

        if (error) {
          acc[field] = error;
        }

        return acc;
      },
      {}
    );

    if (!isEmpty(Object.keys(errors))) {
      throw new SubmissionError(errors);
    }

    return undefined;
  }
}

export default compose(
  connect(state => ({ form: page.selectors.getNameOfCurrentPage(state) }))
)(Form);
