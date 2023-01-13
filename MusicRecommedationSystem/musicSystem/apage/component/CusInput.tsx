import React from 'react';
import {TextInput} from 'react-native';
import styles from '../css/InputField.scss';
const CusInput = ({value, setValue, placeholder, hide, type}: any) => {
  return (
    <>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={hide}
        keyboardType={type}
      />
    </>
  );
};

export default CusInput;
