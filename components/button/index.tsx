import { Button as Btn } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// @ts-ignore
const Button = ({ children, style = {}, icon, iconSize = 20, textSize = 15, corIcone = "white", corTexto = "white", ...props }) => {
    return (
        <Btn
            {...props}
            icon={icon ? () => <MaterialCommunityIcons name={icon} size={iconSize} color={corIcone} /> : undefined}
            style={[style]}
            labelStyle={{ fontSize: textSize, color: corTexto }} // Adiciona cor do texto aqui
        >
            {children}
        </Btn>
    );
};

export default Button;
