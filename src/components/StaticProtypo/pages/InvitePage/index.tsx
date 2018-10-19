import * as React from 'react';
import { View } from 'react-native';
import Text from 'components/ui/Text';

import styles from './styles';

interface InvitePage {
  params: {
    ecosystem: string;
    page?: string;
  };
  addEcosystemToList: (params: { ecosystem: string, page?: string }) => void;
}

class StaticInvite extends React.PureComponent<InvitePage> {
  componentDidMount() {
    this.props.addEcosystemToList(this.props.params);
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text
          intl={{
            id: "ecosystem.added.to.list",
            defaultMessage: "Ecosystem has been added to your ecosystems list."
          }}
        />
      </View>
    );
  }
}

export default StaticInvite;
