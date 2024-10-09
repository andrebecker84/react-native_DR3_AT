import * as React from 'react';
import { HelperText, TextInput as TIp, TextInputProps } from 'react-native-paper';

const TextInput = ({ helpText = null, ...props }: any) => {
    return (
        <>
            <TIp {...props} />
            {helpText ? <HelperText type="error" visible={true}>{helpText}</HelperText> : null}
        </>
    );
};

export default TextInput;
