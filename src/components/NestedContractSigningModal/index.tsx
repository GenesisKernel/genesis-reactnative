import * as React from 'react';
import { View, ScrollView } from 'react-native';
import Row from './Row';

import Modal from "react-native-modal";
import Button from 'components/ui/Button';
import Text from 'components/ui/Text';

import styles from './styles';

export interface INestedContractSigningModalProps {
  onConfirm: () => void;
  onClose: () => void;
  params: IParams
}
export interface IParams {
  title: string;
  field: string;
  params: INestedParams[];
  Amount: string;
  Recipient: string;
}
export interface INestedParams {
  name: string;
  text: string;
}
export default class NestedContractSigningForm extends React.Component<INestedContractSigningModalProps, {}> {
  public render() {
    const { params: { title, field, params, Amount, Recipient } } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.titlesContainer}>
            <Text style={styles.title}>{`${field} required`}</Text>
            <Text style={styles.secondaryTitle}>{title}</Text>
          </View>
          <ScrollView style={styles.scrollView}>
            {params.map((item: INestedParams, i: number) => {
              return (
                <Row Amount={Amount} Recipient={Recipient} {...item} key={i} index={i}/>
              );
            })}
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={this.props.onConfirm}
              buttonStyle={[styles.button, styles.leftButton]}
              title="OK" />
            <Button
              onPress={this.props.onClose}
              buttonStyle={styles.button}
              title="CANCEL" />
          </View>
        </View>
      </View>
    );
  }
}
