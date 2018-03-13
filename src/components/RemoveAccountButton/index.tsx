import * as React from 'react';
import styles from './styles';
import Button from 'components/ui/Button';

const removeButtonProps = {
  intl: {
    id: 'remove',
    defaultMessage: 'Remove'
  }
};

interface IRemoveAccountButton {
  onRemove: () => void;
}

export default class RemoveAccountButton extends React.Component<IRemoveAccountButton> {

  public render () {
    return (
      <Button
        onPress={this.onRemove}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
        {...removeButtonProps}/>
    );
  }

  private onRemove = () => {
    const { onRemove } = this.props;
    onRemove();
  }
}