import * as React from 'react';
import { Icon } from 'react-native-elements';
import { Colors } from 'components/ui/theme';
import { actions } from 'modules/page';
import styles from './styles';

interface IBackButton {
  historyItems: actions.IPagePayload[];
  requestPageStarted: (pagePayload: actions.IPagePayload) => void;
  navigateWithReset: () => void;
}

class BackButton extends React.Component<IBackButton, {}> {
  public render() {
    
    return (
      <Icon
        type="simple-line-icon"
        name="arrow-left"
        size={22}
        color={Colors.dark}
        containerStyle={styles.icon}
        underlayColor="transparent"
        onPress={this.onPress}
      />
    );
  }

  private onPress = () => {
    const { requestPageStarted, historyItems } = this.props;

    historyItems.pop();

    if (historyItems.length === 1) {
      this.props.navigateWithReset();
      return;
    }

    const pagePayload: actions.IPagePayload = historyItems[historyItems.length - 1];

    requestPageStarted(pagePayload);
  }
}

export default BackButton;
