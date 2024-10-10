import { Surface, Menu as Mn } from "react-native-paper";
import { useTheme } from "@/hooks/useTheme";
import { Text } from "react-native"; // Importe o Text do react-native

const Menu = (props: any) => {
  const { colorScheme } = useTheme(); // Obtém o tema atual
  const backgroundColor = colorScheme === "dark" ? "rgb(50, 40, 70)" : "#f0f0f0"; // Cor de fundo
  const titleColor = colorScheme === "dark" ? "hsl(215, 15%, 75%)" : "#000"; // Cor do texto do título

  return props.visible ? (
    <Surface
      style={{
        position: "absolute",
        right: 20,
        top: 100,
        backgroundColor: backgroundColor,
        borderRadius: 20,
        padding: 10,
        zIndex: 10000,
      }}
      elevation={3}
    >
      {props.items.map((item: any, index: number) => {
        return (
          <Mn.Item
            key={index}
            leadingIcon={item.leadingIcon} // Use a propriedade de ícone passada
            onPress={() => {
              item.onPress();
              props.setVisible(false);
            }}
            title={item.title} // Passa o título normalmente
            titleStyle={{ color: titleColor }} // Altera a cor do título aqui se Mn.Item permitir
          />
        );
      })}
    </Surface>
  ) : null;
};

export default Menu;
