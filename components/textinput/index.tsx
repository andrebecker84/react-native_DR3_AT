import * as React from 'react';
import { HelperText, TextInput as TIp, TextInputProps } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';

// Definindo a interface para as propriedades do TextInput
interface CustomTextInputProps extends TextInputProps {
  helpText?: string | null;
  width?: ViewStyle['width'];
}

const TextInput: React.FC<CustomTextInputProps> = ({
  helpText = null,
  width = "auto",
  style,
  ...props
}) => {
  return (
    <>
      <TIp {...props} style={[styles.textInput, style, { width }]} />
      {helpText ? (
        <HelperText type="error" visible={true}>
          {helpText}
        </HelperText>
      ) : null}
    </>
  );
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
});

export default TextInput;
