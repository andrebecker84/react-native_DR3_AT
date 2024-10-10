import { router } from "expo-router";
import { useState } from "react";
import { useSession } from "@/app/ctx";
import AppBar from "./AppBar";
import Menu from "./Menu";

const Topbar = ({ title, menu = true, back = false }: any) => {
  const { signOut } = useSession();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <AppBar
        title={title}
        icon={menu ? "dots-vertical" : ""}
        onPress={() => setVisible(!visible)}
        back={back}
      />
      {menu ? (
        <Menu
          visible={visible}
          setVisible={setVisible}
          items={[
            {
              title: "Configurações",
              leadingIcon: "cog",
              onPress: () => {
                router.push("/settings");
              },
            },
            {
              title: "Logout",
              leadingIcon: "logout",
              onPress: async () => {
                console.log("Tentando fazer logout");
                await signOut();
                console.log("Logout realizado");
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
