import { router } from "expo-router";
import { useState } from "react";
import { useSession } from "@/app/ctx";
import AppBar from "./AppBar";
import Menu from "./Menu";
import { useTheme } from "@/hooks/useTheme"; // Importa o hook personalizado de tema
import Ionicons from "react-native-vector-icons/Ionicons"; // Importa Ionicons

const Topbar = ({ title, menu = true, back = false }: any) => {
  const { signOut } = useSession();
  const [visible, setVisible] = useState(false);
  const { colorScheme, toggleTheme } = useTheme(); // Obtém o tema e o alternador de tema

  const temaIcone = colorScheme === "dark" ? "sunny" : "moon"; // Define o ícone baseado no tema
  const corIcone = colorScheme === "dark" ? "rgb(253, 204, 13)" : "rgb(174, 80, 242)"; // Cor chamativa para cada tema

  return (
    <>
      <AppBar
        title={title}
        icon={menu ? "dots-vertical" : ""}
        onPress={() => setVisible(!visible)}
        back={back}
        titleStyle={{ color: colorScheme === "dark" ? "#fff" : "#000" }}
      />
      {menu ? (
        <Menu
          visible={visible}
          setVisible={setVisible}
          items={[
            {
              title: "Configurações",
              leadingIcon: "cog-outline",
              onPress: () => router.push("/settings"),
            },
            {
              title: colorScheme === "dark" ? "Tema Claro" : "Tema Escuro",
              leadingIcon: () => (
                <Ionicons name={temaIcone} size={24} color={corIcone} />
              ),
              onPress: () => {
                toggleTheme(); // Alterna o tema ao clicar
              },
            },
            {
              title: "Logout",
              leadingIcon: "logout-variant",
              onPress: async () => {
                await signOut();
                setVisible(false);
              },
            },
          ]}
        />
      ) : null}
    </>
  );
};

export default Topbar;
