import * as React from 'react';
import Button from 'components/ui/Button';
import styles from './styles';

const removeButtonProps = {
  intl: {
    id: 'account.button.remove',
    defaultMessage: 'Remove'
  }
};

interface IRemoveAccountButton {
  onRemove: () => void;
  recenter: () => void;
  buttonWidth: number;
}

export default class RemoveAccountButton extends React.Component<IRemoveAccountButton> {

  public render () {
    return (
      <Button
        onPress={this.onRemove}
        containerViewStyle={styles.buttonContainer}
        buttonStyle={[styles.button, { width: this.props.buttonWidth }]}
        textStyle={styles.buttonText}
        {...removeButtonProps}/>
    );
  }

  private onRemove = () => {
    const { onRemove, recenter } = this.props;
    recenter();
    onRemove();
  }
}