import * as React from 'react';
import { StatusBar as NativeStatusBar } from 'react-native';

export interface IStatusBarProps {
  barStyle: string;
  backgroundColor: string;
}

export default class StatusBar extends React.PureComponent<IStatusBarProps> {
  public render() {
    return (
      <NativeStatusBar
        backgroundColor={this.props.backgroundColor}
        barStyle={this.props.barStyle}
      />
    );
  }
}