import * as React from 'react';
import { View } from 'react-native';

import StaticInvite from 'components/StaticInvite';
import StaticBackup from 'components/StaticBackup';
import StaticEditor from 'components/StaticEditor';

import { STATIC_PAGE } from '../../constants';

import styles from './styles';

interface IStaticProps {
  staticPageName: string;
}

export type StaticTemplateOption = { [name: string]: JSX.Element };

const StaticTemplate: StaticTemplateOption = {
  [STATIC_PAGE.backup]: <StaticBackup /> as JSX.Element,
  [STATIC_PAGE.invite]: <StaticInvite /> as JSX.Element,
  [STATIC_PAGE.editor]: <StaticEditor /> as JSX.Element,
};

class StaticProtypo extends React.Component<IStaticProps, object> {

  public render() {
    const { staticPageName } = this.props;
    const renderStaticPage: JSX.Element = StaticTemplate[staticPageName];

    return (
      <View style={styles.container}>
        {renderStaticPage}
      </View>
    );
  }
}

export default StaticProtypo;
