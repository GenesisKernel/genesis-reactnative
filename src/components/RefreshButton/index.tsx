import * as React from 'react';
import { Icon } from 'react-native-elements';
import { Colors } from 'components/ui/theme';
import { actions } from 'modules/page';
import styles from './styles';

interface IRefreshButton {
  navigation: any;
  historyItems: actions.IPagePayload[];
  currentItem: string;
  requestPageStarted: (pagePayload: actions.IPagePayload) => void;
}

class RefreshButton extends React.Component<IRefreshButton, {}> {
  public render() {
    return (
      <Icon
        type="simple-line-icon"
        name="refresh"
        size={22}
        color={Colors.dark}
        containerStyle={styles.icon}
        underlayColor="transparent"
        onPress={this.onPress}
      />
    );
  }

  private onPress = () => {
    const { requestPageStarted, historyItems, currentItem } = this.props;

    const pagePayload: actions.IPagePayload | undefined = historyItems.find(findItem => findItem.name === currentItem);

    if (pagePayload) {
      requestPageStarted(pagePayload);
      return;
    }

    this.props.navigation.goBack();
  };
}

export default RefreshButton;
