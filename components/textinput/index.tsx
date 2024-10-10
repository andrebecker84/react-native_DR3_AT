import * as React from 'react';
import { HelperText, TextInput as TIp } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const TextInput = (props) => {
  return (
    <>
      <TIp {...props} style={[styles.textInput, props.style]} />
      {props.helpText ? (
        <HelperText type="error" visible={true}>
          {props.helpText}
        </HelperText>
      ) : null}
    </>
  );
};

TextInput.defaultProps = {
  helpText: null,
  width: "100%",
};

const styles = StyleSheet.create({
  textInput: {
    margin: 20,
    backgroundColor: "rgb(29, 33, 38)",
    borderWidth: 1,
    borderColor: "rgb(223, 70, 97)",
    borderRadius: 5,
    marginVertical: 8,
    shadowColor: "rgb(255, 60, 97)",
    // shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
});

export default TextInput;
