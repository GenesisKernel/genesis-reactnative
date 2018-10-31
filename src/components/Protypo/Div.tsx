import * as React from 'react';
import { View } from 'react-native';
import { stylable } from 'react-native-stylable';

export interface IDivProps extends IElementProps {
  interaction: IInteractions,
  form: any,
}
interface State {
  form: null | ICondition;
}

class Div extends React.PureComponent<IDivProps, State> {
  render() {
    const { children, style, form } = this.props;
    return this.renderDiv();
  }

  private renderDiv = () => {
    const { children, style, form } = this.props;

    if (!form) return <View style={[style]}>{children}</View>

    return this.handleInteraction();
  }

  handleInteraction = () => {
    const { interaction, form, style, children } = this.props;
    const hideInteraction = interaction['hide'];
    const showInteraction = interaction['show'];

    if (hideInteraction) {
      for (const condition of hideInteraction) {
        for (const inputName in condition) {
          if (condition[inputName] !== form[inputName]) {
            return <View style={[style]}>{children}</View>
          } else {
            return null;
          }
        }
      }
    }
    if (showInteraction) {
      for (const condition of showInteraction) {
        for (const inputName in condition) {
          if (condition[inputName] === form[inputName]) {
            return <View style={[style]}>{children}</View>
          } else {
            return null;
          }
        }
      }
    }
    return <View style={[style]}>{children}</View>;;
  }
}
export default stylable('Div')(Div);
