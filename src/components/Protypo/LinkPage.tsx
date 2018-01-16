import * as React from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { stylable } from 'react-native-stylable';

export interface IButtonProps extends IElementProps {
  style?: any;
  attr: {
    page?: string;
    params?: { [key: string]: string };
  };

  submit(params: any): void;
}

class LinkPage extends React.PureComponent<IButtonProps> {
  public render() {
    const { children, style } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[style]}
        onPress={this.handleSubmit}
      >
        {children}
      </TouchableOpacity>
    );
  }

  private handleSubmit = () => {
    const { attr: { page, params }, submit } = this.props;

    submit({
      page,
      pageparams: params
    });
  }
}

export default stylable('LinkPage')(LinkPage);
