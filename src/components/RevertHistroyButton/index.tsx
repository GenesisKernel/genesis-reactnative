import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

class RevertHistroyButton extends React.Component<object, object> {
  public static contextTypes = {
    drawer: PropTypes.object
  };

  public render() {
    const { visible, ...itemProps } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <ListItem
        title="Back"
        hideChevron
        {...itemProps}
        onPress={this.handlePress}
      />
    );
  }

  private handlePress = () => {
    this.context.drawer.close(() => {
      this.props.onPress();
    });
  }
}
export default RevertHistroyButton;
