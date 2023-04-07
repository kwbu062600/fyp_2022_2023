import React from 'react';
import {Keyboard, TextInput, TouchableWithoutFeedback} from 'react-native';
import styles from '../css/InputField.scss';
const CusInput = ({value, setValue, placeholder, hide, type}: any) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={hide}
          keyboardType={type}
          returnKeyType= "done"
        />
      </TouchableWithoutFeedback>
    </>
  );
};

export default CusInput;
