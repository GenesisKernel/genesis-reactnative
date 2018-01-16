import * as React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import ImagePicker, { Image as IImage } from 'react-native-image-crop-picker';
import RootSiblings from 'react-native-root-siblings';
import PopupDialog from 'react-native-popup-dialog';

import Button from 'components/ui/Button';
import styles from './styles';

type RatioType = '1/1' | '1/2' | '2/1' | '3/4';

interface IInputImageProps {
  value?: string;
  width?: string;
  ratio?: RatioType;
  placeholder?: string;
  onChange?: (value: string | null) => void;
  style?: any;
}

const DEFAULT_WIDTH = '100';
const DEFAULT_RATIO = '1/1';

const extractParams = (
  widthRaw: string = DEFAULT_WIDTH,
  ratioRaw: string = DEFAULT_RATIO
): { width: number; height: number } => {
  const matches = /^ *(\d*) *\/ *(\d*) *$/.exec(ratioRaw);
  let ratio: number = 1;
  let width: number = 100;

  if (matches) {
    const left = parseInt(matches[1], 10);
    const right = parseInt(matches[2], 10);
    ratio = left / right;
    width = isNaN(ratio) ? 1 : ratio;
  }

  width = parseInt(widthRaw, 10);
  width = isNaN(width) ? 100 : width;

  return {
    width,
    height: width * ratio
  };
};

const defaultPickerParams = {
  cropping: true,
  mediaType: 'photo',
  includeBase64: true
};

class InputImage extends React.PureComponent<IInputImageProps> {
  public static defaultProps: IInputImageProps = {
    width: DEFAULT_WIDTH,
    ratio: DEFAULT_RATIO,
    placeholder: 'Select image'
  };

  private dialog: any;

  public render() {
    const { value, placeholder, style, onChange } = this.props;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.handlePickPress}
        style={[styles.input, style]}
      >
        <Text>{value ? 'Image was selected' : placeholder}</Text>
      </TouchableHighlight>
    );
  }

  private closeDialog = () => {
    this.dialog.destroy();
  }

  private handlePickPress = () => {
    this.dialog = new RootSiblings(
      (
        <PopupDialog
          show
          dialogStyle={styles.dialogStyle}
          onDismissed={this.closeDialog}
          width="80%"
          height={120}
        >
          <View style={styles.dialogContentStyle}>
            <Button
              title="Select from library..."
              onPress={this.handlePickFromLibraryPress}
            />
            <Button
              title="Select from camera..."
              onPress={this.handlePickFromCameraPress}
            />
          </View>
        </PopupDialog>
      )
    );
  }

  private handlePickFromLibraryPress = () => {
    const { width, ratio, onChange } = this.props;

    const promise = ImagePicker.openPicker({
      ...defaultPickerParams,
      ...extractParams(width, ratio)
    });

    this.closeDialog();
    this.processImage(promise);
  }

  private handlePickFromCameraPress = () => {
    const { width, ratio, onChange } = this.props;

    const promise = ImagePicker.openCamera({
      ...defaultPickerParams,
      ...extractParams(width, ratio)
    });

    this.closeDialog();
    this.processImage(promise);
  }

  private processImage = (promise: Promise<IImage | IImage[]>) => {
    const { onChange } = this.props;

    return promise
      .then(image => {
        if (!Array.isArray(image) && onChange) {
          onChange(`data:${image.mime};base64,${image.data}`);
        }
      })
      .catch(e => console.log(e));
  }
}

export default InputImage;
