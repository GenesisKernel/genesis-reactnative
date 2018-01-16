import * as React from 'react';
import { Text } from 'react-native';
import HeaderTitle from 'react-navigation/lib/views/Header/HeaderTitle';

import styles from './styles';

const MENU_TYPE_GROUP = 'menugroup';

export interface IPageTitleProps {
  title: string;
  style?: any;
}

const PageTitle: React.SFC<IPageTitleProps> = ({ title, style }) => (
  <HeaderTitle style={[styles.text, style]}>{title}</HeaderTitle>
);

export default PageTitle;
