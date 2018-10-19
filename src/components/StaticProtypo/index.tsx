import * as React from 'react';
import { View } from 'react-native';

import InvitePage from './pages/InvitePage';

import styles from './styles';

interface IStaticProps {
  pageName: string;
  page: {
    params: any;
    name: string;
  }
  addEcosystemToList: (params: any) => void;
}

class StaticProtypo extends React.Component<IStaticProps> {
  public render() {
    return (
      <View style={styles.container}>
        {this.renderStaticPage()}
      </View>
    );
  }

  private renderStaticPage = (): React.ReactNode => {
    const { pageName, page, addEcosystemToList } = this.props;

    if (pageName === '@invite') {
      return <InvitePage params={page.params} addEcosystemToList={addEcosystemToList} />;
    }
    return null;
  }

}

export default StaticProtypo;
