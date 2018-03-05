import * as React from 'react';
import { Platform } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export interface IKeyboardAwareViewState {
  isKeyboardOpened: boolean;
}

export interface IKeyboardAwareViewProps {
  children: any;
  style?: {};
  scrollViewProps?: {
    contentContainerStyle: object;
  };
}


export default class KeyboardAwareView extends React.Component<IKeyboardAwareViewProps, IKeyboardAwareViewState> {

  static defaultProps = {
    style: {},
    scrollViewProps: {},
  }

  state = {
    isKeyboardOpened: false,
  }

  public render() {
    const { isKeyboardOpened } = this.state;

    return (
      <KeyboardAwareScrollView
        {...this.setKeyboardEventListeners()}
        style={[styles.container, this.props.style, isKeyboardOpened ? { marginBottom: 30 } : {}]}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="always"
        {...this.props.scrollViewProps}
      >
        {this.props.children}
      </KeyboardAwareScrollView>
    )
  }

  private handleKeyboardShow = (): void => {
    !this.state.isKeyboardOpened && this.setState({ isKeyboardOpened: true });
  }

  private handleKeyboardHide = (): void => {
    this.state.isKeyboardOpened && this.setState({ isKeyboardOpened: false });
  }

  private setKeyboardEventListeners = (): {
    onKeyboardDidShow?: () => void;
    onKeyboardWillShow?: () => void;
    onKeyboardWillHide?: () => void;
    onKeyboardDidHide?: () => void;
  } => {
    const isAndroid = Platform.OS === 'android';
    return {
      [isAndroid ? 'onKeyboardDidShow' : 'onKeyboardWillShow']: this.handleKeyboardShow,
      [isAndroid ? 'onKeyboardDidHide' : 'onKeyboardWillHide']: this.handleKeyboardHide
    }
  }
}