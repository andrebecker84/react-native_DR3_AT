import { router } from "expo-router";
import { useState } from "react";
import { useSession } from "@/app/ctx";
import AppBar from "./AppBar";
import Menu from "./Menu";
import { useTheme } from "@/hooks/useTheme";
import Ionicons from "react-native-vector-icons/Ionicons";

const Topbar = ({ title, menu = true, back = false }: any) => {
  const { signOut } = useSession();
  const [visible, setVisible] = useState(false);
  const { colorScheme, toggleTheme } = useTheme(); // Obtém o tema e o alternador de tema

  const temaIcone = colorScheme === "dark" ? "sunny" : "moon";
  const corIcone = colorScheme === "dark" ? "rgb(253, 149, 13)" : "rgb(174, 80, 242)";
  const corIconesGerais = colorScheme === "dark" ? "#fff" : "#000";

  return (
    <>
      <AppBar
        title={title}
        icon={menu ? "dots-vertical" : ""}
        onPress={() => setVisible(!visible)}
        back={back}
        titleStyle={{ color: colorScheme === "dark" ? "#f0f0f0" : "#000" }}
      />
      {menu ? (
        <Menu
          visible={visible}
          setVisible={setVisible}
          colorScheme={colorScheme}
          items={[
            {
              title: "Configurações",
              leadingIcon: () => (
                <Ionicons name="cog" size={24} color={corIconesGerais} />
              ),
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
              title: "Sair",
              leadingIcon: () => (
                <Ionicons name="log-out-outline" size={24} color={corIconesGerais} />
              ),
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
