import * as React from 'react';
import DatePicker from 'react-native-datepicker';

import styles from './styles';

interface IInputDateProps {
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  style?: any;
}

const defaultDate = new Date();
const customStyles = {
  dateInput: styles.dateInput,
  dateTouchBody: styles.dateTouchBody,
  btnTextConfirm: styles.btnTextConfirm
};

const InputDate: React.SFC<IInputDateProps> = props => {
  const { value, placeholder, style, onChange, ...datePickerProps } = props;

  return (
    <DatePicker
      style={[styles.input, style]}
      customStyles={customStyles}
      date={value || defaultDate}
      mode="date"
      placeholder={placeholder}
      format="YYYY-MM-DD"
      showIcon={false}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      onDateChange={onChange}
      {...datePickerProps}
    />
  );
};

export default InputDate;
