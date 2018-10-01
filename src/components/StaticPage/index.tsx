import * as React from 'react';
import { View } from 'react-native';
import styles from './styles';

interface IStaticPage {
  currentPageId?: string;
  page: string;
  ecosystem: any;
}

class StaticPage extends React.Component<IStaticPage> {
  public render() {
    const { currentPageId, page, ecosystem } = this.props;

    return <div>StaticPage</div>;
  }
}

export default StaticPage;
